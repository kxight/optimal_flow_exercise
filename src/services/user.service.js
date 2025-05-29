const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user.model');
const Account = require('../models/account.model');

const userStore = require('../data/storage/user.store');
const accountStore = require('../data/storage/account.store');

const SALT_ROUNDS = 10;
const DEFAULT_BALANCE = 100;

exports.createUser = async (username, email, password) => {
        if (userStore.getByEmail(email)) {
          const error = new Error("Email already registered");
          error.statusCode = 400;
          throw error;
        }
          
          const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
          const userId = uuidv4();
        
          const user = new User(userId, username, email, hashedPassword);
          userStore.insert(user);
        
          const account = new Account(uuidv4(), userId, DEFAULT_BALANCE);
          accountStore.insert(account);
    
    return user;
}

exports.login = async (email, password) => {
  const plainUser = userStore.getByEmail(email);
  if (!plainUser) {
    const error = new Error('Invalid email');
    error.statusCode = 400;
    throw error;
  }

  const match = await bcrypt.compare(password, plainUser.passwordHash);
  if (!match) {
    const error = new Error('Invalid password');
    error.statusCode = 400;
    throw error;
  }

  // Create a User instance from plainUser data
  const user = new User(
    plainUser.id,
    plainUser.username,
    plainUser.email,
    plainUser.passwordHash,
    plainUser.createdAt,
    plainUser.updatedAt
  );

  return user;
}

exports.getAllUsers = () => {
  // Return users without passwordHash
  return userStore.getAll().map(({ passwordHash, ...rest }) => rest);
}

exports.getUserById = (id) => {
  const user = userStore.getById(id);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 400;
    throw error;
  }

  // Remove passwordHash before returning
  const { passwordHash, ...rest } = user;
  return rest;
}