const router = require("express").Router();
const { authorize } = require("../middleware/auth");
const { validateCardBody, validateId } = require("../middleware/validation");
const {
  createItem,
  getItems,
  deleteItems,
  likeItems,
  dislikeItems,
} = require("../controllers/clothingItems");

router.post("/", validateCardBody, authorize, createItem);

router.get("/", getItems);

router.delete("/:itemId", validateId, authorize, deleteItems);

router.put("/:itemId/likes", validateId, authorize, likeItems);

router.delete("/:itemId/likes", validateId, authorize, dislikeItems);

module.exports = router;
