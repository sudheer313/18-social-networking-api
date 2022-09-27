const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  newUser,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers);

// /api/users/:id
router.route("/:id").get(getSingleUser);

// /api/users
router.route("/").post(newUser);

module.exports = router;
