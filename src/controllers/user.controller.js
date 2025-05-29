const userService = require('../services/user.service');
const cookieToken = require('../utils/cookieToken');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }

    const user = await userService.createUser(username, email, password);

    cookieToken(user, res);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await userService.login(email, password);

    if (!user) {
      return res.status(400).json({ success: false, message: "Email or password does not match or exist" });
    }

    cookieToken(user, res);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = userService.getAllUsers();

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = userService.getUserById(req.params.id);

    if (!user) {
      return res.status(400).json({ success: false, message: "No user found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
