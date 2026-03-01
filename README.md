# Streamlit Investments App

This project is a Streamlit application designed to provide users with a simple interface for viewing investment data. The application consists of a home page that greets users and a placeholder investments page for future development.

## Project Structure

```
├── src
│   ├── main.py          # Entry point of the Streamlit application
│   ├── pages
│   │   ├── home.py      # Home page displaying a greeting message
│   │   └── investments.py # Placeholder for investments page
│   └── utils
│       └── config.py    # Handles loading environment variables
├── .env                  # Stores environment variables and secrets
├── requirements.txt      # Lists project dependencies
└── README.md             # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add your env variables:
   ```
   VARIABLE=<your_value>
   ```

5. **Run the application:**
   ```
   streamlit run src/main.py
   ```

## Application Overview

- **Home Page:** Displays a greeting message to the user.
- **Investments Page:** Currently a placeholder for future development related to displaying investment data.

## Contributing

Feel free to submit issues or pull requests for enhancements or bug fixes.