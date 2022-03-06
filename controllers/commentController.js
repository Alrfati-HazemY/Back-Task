const { Comment } = require("../models");

const notFound = (response) => {
  response.status(404).send({
    status: "fail",
    message: "Not Found",
  });
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    if (comments) {
      res.status(200).send({
        status: "success",
        data: comments,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getComment = async (req, res) => {
  try {
    let { id } = req.params;
    const comment = await Comment.findOne({ where: { id: id } });
    if (comment) {
      res.status(200).send({
        status: "success",
        data: comment,
      });
    } else {
      notFound(res);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createComment = async (req, res) => {
  try {
    if (req.body.userId) {
      const comment = await Comment.create(req.body);
      res.status(201).send({
        status: "success",
        data: comment,
      });
    } else {
      res.status(400).send({
        status: "fail",
        message: "user id is invalid",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateComment = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, content } = req.body;
    let comment = await Comment.findOne({ where: { id: id } });
    if (comment) {
      comment = await comment.update({
        title: title,
        content: content,
      });
      res.status(200).send({
        status: "success",
        data: comment,
      });
    } else {
      notFound(res);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteComment = async (req, res) => {
  try {
    let { id } = req.params;
    const comment = await Comment.findOne({ where: { id: id } });
    if (comment) {
      await comment.destroy();
      res.status(200).send({
        status: "success",
        data: null,
      });
    } else {
      notFound(res);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
