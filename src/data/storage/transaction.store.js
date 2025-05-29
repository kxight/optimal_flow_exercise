const fs = require('fs');
const path = require('path');
const transactionsFile = path.join(__dirname, '..', 'transactions.json');

function ensureFile() {
  if (!fs.existsSync(transactionsFile)) {
    fs.writeFileSync(transactionsFile, '[]', 'utf-8');
  }
}

exports.get = () => {
  ensureFile();
  const raw = fs.readFileSync(transactionsFile, 'utf-8');
  return JSON.parse(raw);
};

exports.save = (transactions) => {
  fs.writeFileSync(transactionsFile, JSON.stringify(transactions, null, 2), 'utf-8');
};

exports.insert = (transaction) => {
  const transactions = exports.get();
  transactions.push(transaction);
  exports.save(transactions);
};

exports.getByAccountId = (accountId) => {
  const transactions = exports.get();
  return transactions.filter(t => t.accountId === accountId);
};
