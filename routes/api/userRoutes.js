const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  newUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);

// /api/users
router.route("/").post(newUser);

// /api/users/:userId
router.route("/:userId").put(updateUser);

// /api/users/:userId
router.route("/:userId").delete(deleteUser);

///api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend);

///api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(deleteFriend);
module.exports = router;
