const { User, Post } = require("../models");

const notFound = (response) => {
  response.status(404).send({
    status: "fail",
    message: "Not Found",
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.status(200).send({
        status: "success",
        data: users,
      });
    } else {
      notFound(res);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      res.status(200).send({
        status: "success",
        data: user,
      });
    } else {
      notFound(res);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let { username, email, password } = req.body;
    let user = await User.findOne({ where: { id: id } });
    if (user) {
      user = await user.update({
        username: username,
        email: email,
        password: password,
      });
      res.status(200).send({
        status: "success",
        data: user,
      });
    } else {
      notFound(res);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      await user.destroy();
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

const getUserPosts = async (req, res) => {
  try {
    let { id } = req.params;
    const userPosts = await User.findOne({
      where: { id: id },
      include: [
        {
          model: Post,
          where: { userId: id },
        },
      ],
    });
    if (userPosts) {
      res.status(200).send({
        status: "success",
        data: userPosts,
      });
    } else {
      notFound(res);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserPosts,
};
