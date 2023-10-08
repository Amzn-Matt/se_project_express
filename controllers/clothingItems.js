const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.user._id);

  const { name, weather, image } = req.body;

  ClothingItem.create({ name, weather, image, owner: req.user._id })
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
        res.status(DEFAULT_ERROR).send({ message: "Error with createItem", e });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error with getItems", e });
    });
};

const deleteItems = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.status(204).send({});
    })
    .catch((e) => {
      res.status(DEFAULT_ERROR).send({ message: "Error with deleteItems", e });
    });
};

const likeItems = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(NOT_FOUND).send({ message: "Item could not be found" });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Error with likeItems", e });
      }
    });
};

const dislikeItems = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(NOT_FOUND).send({ message: "Item could not be found" });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "Error with dislikeItems", e });
      }
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItems,
  likeItems,
  dislikeItems,
};
