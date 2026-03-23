import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const envOrigins = (process.env.FRONTEND_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const devOrigins = process.env.NODE_ENV !== 'production' 
    ? ['http://localhost:5500', 'http://127.0.0.1:5500']
    : [];

const allowedOrigins = new Set([
    ...envOrigins,
    ...devOrigins,
    'https://mahiray.vercel.app'
]);

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Explicit preflight handling for all routes
app.options('*', cors(corsOptions));

app.use(express.json());

// Main Email Relay Route
app.post('/sendmail', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: "Incomplete form data." });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.RECEIVER_EMAIL,
        subject: `[Portfolio] ${subject}`,
        text: `Sender: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Message dispatched successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Transmission failed. Check backend credentials." });
    }
});

export default app;

// Local development only
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Backend active on PORT ${PORT}`);
    });
}