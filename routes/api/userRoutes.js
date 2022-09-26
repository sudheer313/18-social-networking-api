const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  newUser,
  updateCourse,
  deleteCourse,
} = require("../../controllers/userController.js");

// /api/courses
router.route("/").get(getUsers).post(newUser);

// /api/courses/:courseId
router.route("/:Id").get(getSingleUser).put(updateCourse).delete(deleteCourse);

module.exports = router;
