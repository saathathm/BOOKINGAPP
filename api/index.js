const express = require('express');
const dotenv = require('dotenv');

const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express()

//Load Config
dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');

connectDB();

//Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800);