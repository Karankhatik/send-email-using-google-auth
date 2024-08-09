<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Sender MERN App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1, h2 {
            color: #007BFF;
        }
        code {
            background: #eee;
            padding: 2px 4px;
            border-radius: 4px;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        ul {
            list-style-type: disc;
            margin: 0;
            padding: 0 20px;
        }
        li {
            margin-bottom: 10px;
        }
        .emoji {
            font-size: 1.2em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="emoji">📧 Email Sender MERN App</h1>
        <p>Welcome to the Email Sender MERN App! This project allows you to send emails using Google OAuth with dynamically generated refresh tokens.</p>

        <h2 class="emoji">🗂️ Folder Structure</h2>
        <ul>
            <li><strong>ui/</strong>: Contains the frontend React application.</li>
            <li><strong>api/</strong>: Contains the backend Node.js/Express application.</li>
        </ul>

        <h2 class="emoji">🚀 Getting Started</h2>
        <h3>Prerequisites</h3>
        <ul>
            <li>Node.js and npm installed.</li>
            <li>A MongoDB server (local or cloud-based).</li>
            <li>A Google Cloud project with OAuth 2.0 credentials.</li>
        </ul>

        <h3>Setup</h3>

        <h4>1. Backend Setup (<code>api/</code>)</h4>
        <ol>
            <li><strong>Navigate to the backend directory:</strong>
                <pre><code>cd api</code></pre>
            </li>
            <li><strong>Install dependencies:</strong>
                <pre><code>npm install</code></pre>
            </li>
            <li><strong>Configure environment variables:</strong>
                <p>Create a <code>.env</code> file in the <code>api/</code> directory and add the following:</p>
                <pre><code>PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
REDIRECT_URI=your_redirect_uri
</code></pre>
            </li>
            <li><strong>Run the backend server:</strong>
                <pre><code>npm start</code></pre>
                <p>The backend server will start on <code>http://localhost:5000</code>.</p>
            </li>
        </ol>

        <h4>2. Frontend Setup (<code>ui/</code>)</h4>
        <ol>
            <li><strong>Navigate to the frontend directory:</strong>
                <pre><code>cd ui</code></pre>
            </li>
            <li><strong>Install dependencies:</strong>
                <pre><code>npm install</code></pre>
            </li>
            <li><strong>Configure environment variables:</strong>
                <p>Create a <code>.env</code> file in the <code>ui/</code> directory and add the following:</p>
                <pre><code>REACT_APP_API_URL=http://localhost:5000
</code></pre>
            </li>
            <li><strong>Run the frontend application:</strong>
                <pre><code>npm start</code></pre>
                <p>The frontend application will start on <code>http://localhost:3000</code>.</p>
            </li>
        </ol>

        <h2 class="emoji">✉️ How to Use</h2>
        <ol>
            <li><strong>Authenticate with Google:</strong>
                <p>Go to the frontend app, and sign in with Google. The backend handles the OAuth flow and provides access and refresh tokens.</p>
            </li>
            <li><strong>Send Emails:</strong>
                <p>Once authenticated, use the app to compose and send emails. The frontend sends email data to the backend, which uses the Google API to send the email.</p>
            </li>
        </ol>

        <h2 class="emoji">📚 API Endpoints</h2>
        <ul>
            <li><strong>POST /api/auth/google</strong>: Starts the Google OAuth flow.</li>
            <li><strong>GET /api/auth/callback</strong>: Handles the OAuth callback and exchanges code for tokens.</li>
            <li><strong>POST /api/send-email</strong>: Sends an email.</li>
        </ul>

        <h2 class="emoji">🛠️ Troubleshooting</h2>
        <ul>
            <li>Ensure MongoDB is running and accessible.</li>
            <li>Verify Google OAuth credentials and redirect URIs in the Google Cloud Console and <code>.env</code> files.</li>
            <li>Check frontend and backend logs for errors and refer to the documentation for solutions.</li>
        </ul>
    </div>
</body>
</html>

