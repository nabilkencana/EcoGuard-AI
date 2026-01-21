// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password
    }
});

exports.sendDemoRequestEmail = functions.firestore
    .document('demo_requests/{requestId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();

        const mailOptions = {
            from: 'EcoGuard AI <noreply@ecoguard-ai.com>',
            to: 'team@ecoguard-ai.com',
            subject: `New Demo Request: ${data.company}`,
            html: `<h1>New Demo Request</h1><p>From: ${data.name}</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent for request:', context.params.requestId);
    });