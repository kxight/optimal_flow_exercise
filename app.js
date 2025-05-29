const express = require('express');
const app = express();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// export app js
module.exports = app;