
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use((req, res, next) => { console.log('ASSIGNMENT:', req.method, req.originalUrl); next(); });
app.use('/api/products', require('./routes/product.route'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error);
    });

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running!');
});

