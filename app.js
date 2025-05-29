const express = require('express');
const app = express();

const userRoutes = require('./src/routes/user.route');

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);

// export app js
module.exports = app;