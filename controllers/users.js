const mongoose = require("mongoose");
const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require("../utils/errors");

const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((item) => {
      console.log(item);
      res.status(201).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: `Error ${e.name} with the message ${e.message} has occurred while executing the code`,
        });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Error with createUser", e });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      res.status(DEFAULT_ERROR).send({ message: "Error with getUsers", e });
    });
};

const getUser = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Error with getUser", e });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
