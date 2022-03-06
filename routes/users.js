const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();
let { getAllUsers, getUser, createUser, updateUser, deleteUser, getUserPosts } =
  userController;

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

router.route("/:id/posts").get(getUserPosts);

module.exports = router;
