const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  tweets: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default: '',
  },
  followers: {
    type: Number,
    default: 0,
  },
  followed: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
