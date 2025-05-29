const express = require('express');
const router = express.Router();

const {
    signup,
    login,
    getUser,
    getUserById
} = require('../controllers/user.controller');


router.route('/users')
  .get(getUser)
  .post(signup)

router.route('/users/:id')
  .get(getUserById)

router.route('/login')
    .post(login)


module.exports = router;
