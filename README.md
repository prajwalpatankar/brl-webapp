# Project Setup Guide

This guide provides step-by-step instructions to help you set up the React and Django project on your local environment.

## Prerequisites

Before you proceed, ensure that you have the following software installed on your system:

- Node.js (version 14 or above)
- Python (version 3.8 or above)
- npm (Node Package Manager) or Yarn (recommended)

## Setup Instructions

Please follow the steps below to set up the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/USCBiomechanicsLab/webapp.git
   ```

2. Backend Setup (Django):

   a. Change to the server directory:

   ```bash
   cd server/
   ```

   b. Create and activate a virtual environment (recommended):

   ```bash
   python3 -m venv env
   source env/bin/activate  # For Linux/Mac
   env\Scripts\activate  # For Windows
   ```

   c. Install the required Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

    <!-- d. Apply database migrations: -->
    <!--  -->
   <!-- ```bash -->
   <!-- python manage.py migrate -->
   <!-- ```  -->

   d. Start the Django development server:

   ```bash
   python manage.py runserver
   ```

   The backend server should now be running on `http://localhost:8000/`.

3. Frontend Setup (React):

   a. Change to the client directory:

   ```bash
   cd client/
   ```

   b. Install the required Node.js dependencies:

   ```bash
   npm install  # or yarn install
   ```

   c. Start the React development server:

   ```bash
   npm start  # or yarn start
   ```

   The frontend server should now be running on `http://localhost:3000/`.

4. Open your web browser and access `http://localhost:3000/` to see the React application in action.

That's it! You have successfully set up the React and Django project on your local environment. Feel free to explore and modify the project according to your requirements.

## Additional Notes

- If you encounter any issues during the setup process, please ensure that you have met all the prerequisites and followed the instructions accurately.
- Make sure to configure the backend API endpoints in the React project to match your local setup if needed.
- For deployment and production use, refer to the respective documentation for React and Django to properly configure and optimize your project.

For any further assistance or questions, please feel free to reach out.
