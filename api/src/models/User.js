const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, min: 2},
  lastName: { type: String, required: true, min: 2 },
  email: { type: String, required: true, unique: true, min: 4 },
  password: { type: String, required: true, min: 8 }
});

userSchema.virtual('repeatPassword').set(function (value) {
  if(value !== this.password) {
    throw new Error("Password mismatch!");
  }
});

userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model('User', userSchema);
module.exports = User;