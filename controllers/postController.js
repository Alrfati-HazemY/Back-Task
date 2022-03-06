const { Post, Comment } = require("../models");

const notFound = (response) => {
  response.status(404).send({
    status: "fail",
    message: "Not Found",
  });
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    if (posts) {
      res.status(200).send({
        status: "success",
        data: posts,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPost = async (req, res) => {
  try {
    let { id } = req.params;
    const post = await Post.findOne({ where: { id: id } });
    if (post) {
      res.status(200).send({
        status: "success",
        data: post,
      });
    } else {
      notFound(res);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createPost = async (req, res) => {
  try {
    if (req.body.userId) {
      const post = await Post.create(req.body);
      res.status(201).send({
        status: "success",
        data: post,
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

const updatePost = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, content } = req.body;
    let post = await Post.findOne({ where: { id: id } });
    if (post) {
      post = await post.update({
        title: title,
        content: content,
      });
      res.status(200).send({
        status: "success",
        data: post,
      });
    } else {
      notFound(res);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    let { id } = req.params;
    const post = await Post.findOne({ where: { id: id } });
    if (post) {
      await post.destroy();
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

const getPostComments = async (req, res) => {
  try {
    let { id } = req.params;
    const postComments = await Post.findOne({
      where: { id: id },
      include: [
        {
          model: Comment,
          where: { postId: id },
        },
      ],
    });
    if (postComments) {
      res.status(200).send({
        status: "success",
        data: postComments,
      });
    } else {
      notFound(res);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostComments,
};
