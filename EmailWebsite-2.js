// Node.js server code
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { firstName, email } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yourbusinessemail@gmail.com',
            pass: 'yourpassword',
        },
    });

    const mailOptions = {
        from: 'yourbusinessemail@gmail.com',
        to: email,
        subject: 'Website Code',
        text: `Hello ${firstName},\n\nThank you for your interest! Here is the website code.\n\nBest regards,\nSara’s Websites and Phone Apps`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
