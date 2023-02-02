const express = require('express');
require('colors');
const cors = require('cors');
require('dotenv').config();
const connectToDB = require('./config/db');

const photoRoutes = require('./routes/photoRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 4000;

// Connected to DataBase
connectToDB();

// MIDDLEWARES
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: '*', methods: '*' }));


// ROUTES
app.use('/photos', photoRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});