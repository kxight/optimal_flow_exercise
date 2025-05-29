const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '..', 'users.json');

function ensureFile() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, '[]', 'utf-8');
  }
}

exports.get = () => {
  ensureFile();
  const raw = fs.readFileSync(usersFile, 'utf-8');
  return JSON.parse(raw);
}

exports.save = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}

exports.insert = (user) => {
  const users = this.get();
  users.push(user);
  this.save(users);
}

exports.getByEmail = (email) => {
  const users = this.get();
  return users.find(u => u.email === email);
}

exports.getById = (id) => {
  const users = this.get();
  return users.find(u => u.id === id);
}

exports.getAll = () => {
  return this.get();
}
