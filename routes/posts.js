const express = require("express");
const postController = require("./../controllers/postController");
const router = express.Router();
let {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostComments,
} = postController;

router.route("/").get(getAllPosts).post(createPost);

router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

router.route("/:id/comments").get(getPostComments);

module.exports = router;
