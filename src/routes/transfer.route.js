const express = require('express');
const router = express.Router();

const {
    transfer
} = require('../controllers/transfer.controller');

const { isLoggedIn } = require("../middlewares/auth");

router.route('/transfer')
  .post(isLoggedIn, transfer)

module.exports = router;