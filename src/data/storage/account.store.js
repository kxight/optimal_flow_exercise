const fs = require('fs');
const path = require('path');
const accountsFile = path.join(__dirname, '..', 'accounts.json');

function ensureFile() {
  if (!fs.existsSync(accountsFile)) {
    fs.writeFileSync(accountsFile, '[]', 'utf-8');
  }
}

exports.get = () => {
    ensureFile();
    const raw = fs.readFileSync(accountsFile, 'utf-8');
    return JSON.parse(raw);
    }

exports.save = (accounts) => {
    fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2), 'utf-8');
}

exports.insert = (account) => {
    const accounts = this.get();
    accounts.push(account);
    this.save(accounts);
}

exports.getByUserId = (userId) => {
    const accounts = this.get();
    return accounts.find(a => a.userId === userId);
}

