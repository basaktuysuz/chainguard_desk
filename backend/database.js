// Code for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:Chainguard@chainguard.jmmnyfk.mongodb.net/?retryWrites=true&w=majority&appName=Chainguard');


// Schema for users of app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

    resp.send("App is Working");
    // You can check backend is working or not by
    // entering http://loacalhost:5000

    // If you see App is working means
    // backend working properly
});


// Kullanıcı kaydı
app.post('/signup', async (req, res) => {
    try {
        const { name, email, date } = req.body;
        const user = new User({ name, email, date });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'An error occurred while creating user' });
    }
});

// Kullanıcı girişi
app.post('/login', async (req, res) => {
    const { email, password,date } = req.body;
    try {
        const user = await User.findOne({ email, password ,date });
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'An error occurred while logging in' });
    }
});
app.listen(5000);
