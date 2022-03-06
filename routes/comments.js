const express = require("express");
const commentController = require("./../controllers/commentController");
const router = express.Router();
let {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = commentController;

router.route("/").get(getAllComments).post(createComment);

router.route("/:id").get(getComment).put(updateComment).delete(deleteComment);

module.exports = router;



