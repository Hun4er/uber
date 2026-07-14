const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const express = require('express');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

connectToDb();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('hello world');
})

app.use('/users', userRoutes);

module.exports = app;