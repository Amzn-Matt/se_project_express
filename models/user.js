const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    requred: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((userData) => {
      if (!userData) {
        return Promise.reject(new Error("Username or Password are incorrect"));
      }
      return bcrypt.compare(password, userData.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new Error("Username or Password are incorrect"),
          );
        }
        return userData;
      });
    });
};

module.exports = mongoose.model("users", user);
