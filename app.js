const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const bookRoute = require('./routes/bookRoutes');
const app = express();
const PORT = 2000;

app.get('/', function (req, res) {
    try {
        res.send('Welcome to the BookStore');
    } catch {
        res.status(500).send('Server Error');
    }
});

app.use(express.json());
app.use("/books",bookRoute);

app.listen(PORT, async function () {
    try {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error(`Error`,error.message);
    }
});