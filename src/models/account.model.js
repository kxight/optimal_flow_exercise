class Account {
    constructor(id, userId, balance, createdAt, updatedAt) {
      this.id = id;                      // UUID or INT PK
      this.userId = userId;              // FK to User(id)
      this.balance = Number(balance);   // Decimal (12,2) - stored as JS Number
      this.createdAt = createdAt || new Date().toISOString(); // Timestamp
      this.updatedAt = updatedAt || new Date().toISOString(); // Timestamp
    }
  
  }
  
  module.exports = Account;
  