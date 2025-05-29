class Transaction {
    constructor(id, accountId, type, amount, timestamp, note = '') {
      this.id = id;                     // UUID or INT PK
      this.accountId = accountId;       // FK to Account(id)
      this.type = type;                 // 'deposit' or 'withdrawal'
      this.amount = Number(amount);     // Decimal (12,2)
      this.timestamp = timestamp || new Date().toISOString(); // Timestamp
      this.note = note;                 // Optional text
    }
  
    // check if deposit
    isDeposit() {
      return this.type === 'deposit';
    }
  
    // check if withdrawal
    isWithdrawal() {
      return this.type === 'withdrawal';
    }
  }
  
  module.exports = Transaction;
  