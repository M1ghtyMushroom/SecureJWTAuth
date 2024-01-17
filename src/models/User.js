const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'Username already exists'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
    minlength: [8, 'Password must be at least 8 characters'],
  },
  passwordChangedAt: Date,
});

UserSchema.pre('save', async function (next) {
  // no arrow function here because we need to use `this`
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.checkPassword = async function (testPass, realPass) {
  return await bcrypt.compare(testPass, realPass);
};

UserSchema.methods.passwordGotChanged = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
