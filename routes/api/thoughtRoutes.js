const router = require("express").Router();
const {
  getThoughts,
  newThought,
  updateThought,
  deleteThought,
  getThoughtbyId,
  addReactions,deleteReactions
} = require("../../controllers/thoughtController.js");

// /api/thoughts
router.route("/").get(getThoughts);

// /api/thoughts/:id
router.route("/:id").get(getThoughtbyId);

// /api/thoughts/:userId
router.route("/:userId").post(newThought);

// /api/thoughts/:id
router.route("/:id").put(updateThought);

// /api/thoughts/:id
router.route("/:id").delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReactions);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").delete(deleteReactions);

module.exports = router;
