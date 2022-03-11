import { PostModel } from "../models/postModel.mjs";
import { UserModel } from "../models/userModel.mjs";

export const UserRepo = {
  list: async () => {
    const users = await UserModel.findAll();
    return users;
  },
  get: async (id) => {
    const user = await UserModel.findByPk(id);
    return user === null ? {} : user;
  },
  create: async (userData) => {
    const user = await UserModel.create(userData);
    return user;
  },
  update: async (id, userData) => {
    let { username, email, password } = userData;
    let user = await UserModel.update(
      {
        username: username,
        email: email,
        password: password,
      },
      { where: { id: id }, returning: true, plain: true }
    );
    user = await UserRepo.get(id);
    return user;
    //return user[1].dataValues;
  },
  delete: async (id) => {
    await UserModel.destroy({
      where: { id: id },
    });
    return 204;
  },
  getPosts: async (id) => {
    const userPosts = await UserModel.findOne({
      where: { id: id },
      include: [
        {
          model: PostModel,
          where: { userId: id },
        },
      ],
    });
    return userPosts;
  },
};
