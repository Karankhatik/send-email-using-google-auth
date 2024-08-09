const express = require('express');
const app = express();
const cors = require("cors");
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();
const connectDatabase = require("./config/database.js");
const GoogleOauth = require("./models/googleOAuth.js");

//connecting to the database
connectDatabase();


app.use((req, res, next) => {
    res.header("Content-Type", "application/json")
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

app.get('/auth', (req, res) => {

    // for storing the user id it will persist and get back in the call back, 
    //see line 49 to better understand 
    let state = req.query.userID;

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // Important: This ensures we receive a refresh token
        scope: [
            'https://mail.google.com/', //scope for mail sending
            'https://www.googleapis.com/auth/userinfo.email' // Scope to get the user's email
        ],
        state: state
    });
    res.status(200).json({ url, success: true, message: "success" });
});

// this is the call back url you need to mention in your google console
app.get('/oauth2callback', async (req, res) => {
    try {
        const { code, state } = req.query;

        // Get the access token and refresh token from the authentication server
        const { tokens } = await oauth2Client.getToken(code);

        // Set the credentials for the OAuth2 client
        oauth2Client.setCredentials({
            refresh_token: tokens.refresh_token
        });

        // Fetch user information from the authentication server
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        const userInfo = await oauth2.userinfo.get();
        const email = userInfo.data.email;

        const googleOAuthData = await GoogleOauth.findOne({ userID: state });
        if (googleOAuthData) {
            googleOAuthData.userEmail = email;
            googleOAuthData.refershToken = tokens.refresh_token;
            googleOAuthData.isConnected = true;
            await googleOAuthData.save();
        } else {
            await GoogleOauth.create({
                userEmail: email,
                refershToken: tokens.refresh_token,
                accessToken: tokens.access_token,
                isConnected: true,
                userID: state
            });
        }
        //redirectly to your frontend
        res.redirect('http://localhost:3000/');
    } catch (error) {
        console.log(error);
    }
});

app.post('/sendMail', async (req, res) => {
    try {
        const { senderMail, receiverMail, subject, text } = req.body;

        // here you need user id or email to get the referesh token
        const { userEmail, refershToken } = await GoogleOauth.findOne({ userID: req.query.userID });

        // Set the credentials for the OAuth2 client
        oauth2Client.setCredentials({
            refresh_token: refershToken
        });

        // Fetch the token
        const accessTokenResponse = await oauth2Client.getAccessToken();

        // Accessing the access tokens
        const accessToken = accessTokenResponse.res.data.access_token;

        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: userEmail,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: refershToken,
                accessToken: accessToken
            }
        });

        // Set the email options
        const mailOptions = {
            from: `<${senderMail}> your company name`, //can be any mail does not effect the sending mail
            to: receiverMail, 
            subject: subject,
            text: text,
            html: '<p>' + text + '</p>'
        };

        const result = await transporter.sendMail(mailOptions);

        // Save the email details including messageId and possibly threadId to the database
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        // Save the email details including messageId to the database
        const newEmail = new Email({
            messageId: result.messageId, // Assuming Nodemailer provides this correctly
            subject,
            from: senderMail,
            to: receiverMail,
        });

        await newEmail.save();
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.log(error);
    }
})

app.delete('/disconnect', async (req, res) => {
    try {
        const userID = req.query.userID;
        const result = await GoogleOauth.findOneAndDelete({ userID: userID });
        res.status(200).json({ success: true, message: 'disconnected successfully' });
    } catch (error) {
        console.log(error);
    }
});

app.get('/authSetting', async (req, res) => {
    try {
        const result = await GoogleOauth.findOne({
            userID: req.query.userID
        });
        console.log(result);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.log(error);
    }
});

app.get('/', (req, res) => {
    res.send('server is running!');
})

app.listen(5000, () => {
    console.log('Server listening on port 3000  --> http://localhost:5000');
    console.log('click on this link to get auth: http://localhost:3000/auth');
});