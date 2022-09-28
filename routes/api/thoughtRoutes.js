const router = require("express").Router();
const {
  getThoughts,
  newThought,
} = require("../../controllers/thoughtController.js");

// /api/thoughts
router.route("/").get(getThoughts);

// /api/thoughts/:userId
router.route("/:userId").post(newThought);

module.exports = router;
