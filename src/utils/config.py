from dotenv import load_dotenv
import os

load_dotenv()

EXCEL_PATH = os.getenv("EXCEL_PATH")
XIRR_SHEET_NAME = os.getenv("TRANSACTIONS")

def get_excel_path():
    return EXCEL_PATH

def get_xirr_sheet_name():
    return XIRR_SHEET_NAME