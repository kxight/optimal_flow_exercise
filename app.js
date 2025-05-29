const express = require('express');
const app = express();

const userRoutes = require('./src/routes/user.route');
const transferRoutes = require('./src/routes/transfer.route');

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use('/', transferRoutes);

// export app js
module.exports = app;