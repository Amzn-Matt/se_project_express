const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: `Error ${e.name} with the message ${e.message} has occurred while executing the code`,
        });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Error with createUser" });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: "Error with getUsers" });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else if (e.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid User ID" });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Error with getUser" });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
