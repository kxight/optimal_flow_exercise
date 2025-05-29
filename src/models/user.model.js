const jwt = require("jsonwebtoken");
class User {
    constructor(id, username, email, passwordHash, createdAt, updatedAt) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.passwordHash = passwordHash;
      this.createdAt = createdAt || new Date().toISOString();
      this.updatedAt = updatedAt || new Date().toISOString();
    }
  
    // check if email is valid 
    isValidEmail() {
      const re = /\S+@\S+\.\S+/;
      return re.test(this.email);
    }

    getJwtToken() {
      return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });
    }

  }
  
  module.exports = User;
  