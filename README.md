# 📧 Email Sender MERN App

Welcome to the Email Sender MERN App! This project enables you to send emails using Google OAuth with dynamically generated refresh tokens.

## 🗂️ Folder Structure

- **`ui/`**: Contains the frontend React application.
- **`api/`**: Contains the backend Node.js/Express application.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed.
- A MongoDB server (local or cloud-based).
- A Google Cloud project with OAuth 2.0 credentials.

### Setup

#### 1. Backend Setup (`api/`)

1. **Navigate to the backend directory:**

    ```bash
    cd api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the `api/` directory and add the following:

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    REDIRECT_URI=your_redirect_uri
    ```

4. **Run the backend server:**

    ```bash
    npm start
    ```

    The backend server will start on `http://localhost:5000`.

#### 2. Frontend Setup (`ui/`)

1. **Navigate to the frontend directory:**

    ```bash
    cd ui
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the `ui/` directory and add the following:

    ```
    REACT_APP_API_URL=http://localhost:5000
    ```

4. **Run the frontend application:**

    ```bash
    npm start
    ```

    The frontend application will start on `http://localhost:3000`.

## ✉️ How to Use

1. **Authenticate with Google:**

   - Navigate to the frontend app and sign in with Google. The backend handles the OAuth flow and provides access and refresh tokens.

2. **Send Emails:**

   - Once authenticated, use the app to compose and send emails. The frontend sends email data to the backend, which uses the Google API to send the email.

## 📚 API Endpoints

- **POST /api/auth/google**: Initiates the Google OAuth flow.
- **GET /api/auth/callback**: Handles the OAuth callback and exchanges code for tokens.
- **POST /api/send-email**: Sends an email.

## 🛠️ Troubleshooting

- Ensure MongoDB is running and accessible.
- Verify Google OAuth credentials and redirect URIs in the Google Cloud Console and `.env` files.
- Check frontend and backend logs for errors and refer to the documentation for solutions.

---

