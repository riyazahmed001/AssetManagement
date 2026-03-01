# investments.py
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import streamlit as st
import altair as alt
import pandas as pd
from utils.config import get_excel_path, get_xirr_sheet_name

# Constants for transaction types and their ranges
TRANSACTION_RANGES = {
    "Indian Stocks": {"columns": ["B", "C"], "start_row": 13},  # pandas is 0-indexed, so row 14 is index 13
    "EPF": {"columns": ["E", "F"], "start_row": 13},
    "NPS": {"columns": ["H", "I"], "start_row": 13},
    "Mutual Fund": {"columns": ["K", "L"], "start_row": 13},
    "US Stocks": {"columns": ["N", "O"], "start_row": 13}
}

def read_transactions(filepath, sheet_name, transaction_type):
    range_info = TRANSACTION_RANGES[transaction_type]
    cols = range_info["columns"]
    start_row = range_info["start_row"]

    # Read the sheet without header, then select columns and rows
    df = pd.read_excel(filepath, sheet_name=sheet_name, header=None)
    # Convert Excel column letters to indices
    col_indices = [ord(c) - ord('A') for c in cols]
    transactions = df.iloc[start_row:, col_indices]
    transactions.columns = ["Date", "Amount"]
    transactions = transactions.dropna(how="all")
    # Convert to datetime first
    transactions["Date"] = pd.to_datetime(transactions["Date"], errors="coerce")
    # Add year, quarter, month columns
    transactions["Year"] = transactions["Date"].dt.year
    transactions["Date"] = pd.to_datetime(transactions["Date"], errors="coerce").dt.strftime("%Y-%m-%d")

    # Reset index to start from 1
    transactions.index = range(1, len(transactions) + 1)
    return transactions

def calculate_total_investment(transactions_df):
    total_invested = transactions_df["Amount"].sum()
    return -total_invested  # Make positive

def load_transactions(file_path, sheet_name, transaction_type):
    if transaction_type == "ALL":
        dfs = []
        for ttype in TRANSACTION_RANGES.keys():
            df = read_transactions(file_path, sheet_name, ttype)
            df["Type"] = ttype
            dfs.append(df)
        transactions_df = pd.concat(dfs, ignore_index=True)
    else:
        transactions_df = read_transactions(file_path, sheet_name, transaction_type)
        transactions_df["Type"] = transaction_type
    return transactions_df

def filter_transactions(transactions_df, selected_years):
    if selected_years:
        return transactions_df[transactions_df["Year"].isin(selected_years)]
    return transactions_df

def show_transactions_tab(filtered_df, transaction_type):
    total_investment = calculate_total_investment(filtered_df)
    st.metric(label="Total Investments Made", value=f"₹{total_investment:,.2f}")
    st.subheader(f"{transaction_type} Transactions")
    display_cols = ["Type", "Date", "Amount"] if transaction_type == "ALL" else ["Date", "Amount"]
    display_df = filtered_df[display_cols].reset_index(drop=True)
    display_df.index = display_df.index + 1
    st.dataframe(display_df, use_container_width=True)

import altair as alt

def show_yearly_trend_tab(filtered_df):
    yearly_df = (
        filtered_df.groupby("Year")["Amount"]
        .sum()
        .apply(lambda x: -x)
        .reset_index()
    )
    yearly_df["Year"] = yearly_df["Year"].astype(str)

    st.subheader("Investments Made Each Year")
    chart = alt.Chart(yearly_df).mark_line(point=True).encode(
        x=alt.X("Year", title="Year"),
        y=alt.Y("Amount", title="Invested Amount (₹)"),
        tooltip=[alt.Tooltip("Year", title="Year"), alt.Tooltip("Amount", title="Invested Amount (₹)", format=",.2f")]
    ).properties(width="container", height=400)
    st.altair_chart(chart, use_container_width=True)
    
def main():
    file_path = get_excel_path()
    sheet_name = get_xirr_sheet_name()
    if not file_path or not sheet_name:
        st.error("Excel file path or sheet name not set in .env")
        return

    transaction_types = ["ALL"] + list(TRANSACTION_RANGES.keys())
    transaction_type = st.sidebar.selectbox("Select Transaction Type", transaction_types, index=0)

    try:
        transactions_df = load_transactions(file_path, sheet_name, transaction_type)
        years = sorted(transactions_df["Year"].dropna().unique())
        selected_years = st.sidebar.multiselect("Year", years, default=years)
        filtered_df = filter_transactions(transactions_df, selected_years)

        tab1, tab2 = st.tabs(["Transactions", "Yearly Investment Trend"])
        with tab1:
            show_transactions_tab(filtered_df, transaction_type)
        with tab2:
            show_yearly_trend_tab(filtered_df)

    except Exception as e:
        st.error(f"Error reading transactions: {e}")

if __name__ == "__main__":
    main()
