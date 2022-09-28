const router = require("express").Router();
const {
  getThoughts,
  newThought,
  updateThought,
  deleteThought,getThoughtbyId
} = require("../../controllers/thoughtController.js");

// /api/thoughts
router.route("/").get(getThoughts);

// /api/thoughts/:id
router.route("/:id").get(getThoughtbyId);

// /api/thoughts/:userId
router.route("/:userId").post(newThought);

// /api/thoughts/:userId
router.route("/:userId").put(updateThought);

// /api/thoughts/:userId
router.route("/:userId").delete(deleteThought);

module.exports = router;
