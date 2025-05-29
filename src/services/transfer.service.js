const { v4: uuidv4 } = require('uuid');

const Transaction = require('../models/transaction');

const accountStore = require('../data/storage/account.store');
const transactionStore = require('../data/storage/transaction.store');

exports.transferFunds = (fromUserId, toUserId, amount, note = '') => {
  const accounts = accountStore.get(); 
  const fromUserAcc = accounts.find(acc => acc.userId === fromUserId);
  const toUserAcc = accounts.find(acc => acc.userId === toUserId);

  if (!fromUserAcc || !toUserAcc) {
    const error = new Error('Account not found');
    error.statusCode = 400;
    throw error;
  }

  if (fromUserId === toUserId) {
    const error = new Error('Cannot transfer to same user');
    error.statusCode = 400;
    throw error;
  }

  if (isNaN(amount) || amount <= 0) {
    const error = new Error('Amount must be greater than 0');
    error.statusCode = 400;
    throw error;
  }

  if (fromUserAcc.balance < amount) {
    const error = new Error('Insufficient balance');
    error.statusCode = 400;
    throw error;
  }

  // Modify balances 
  fromUserAcc.balance -= amount;
  fromUserAcc.updated_at = new Date().toISOString();
  toUserAcc.balance += amount;
  toUserAcc.updated_at = new Date().toISOString();

  // Create transactions
  const transactions = transactionStore.get();
  transactions.push(
    new Transaction(uuidv4(), fromUserAcc.id, 'withdrawal', amount, null, note),
    new Transaction(uuidv4(), toUserAcc.id, 'deposit', amount, null, note)
  );

  // save
  accountStore.save(accounts);
  transactionStore.save(transactions);

  return {
    from_user_id: fromUserId,
    to_user_id: toUserId,
    amount,
  };
};


