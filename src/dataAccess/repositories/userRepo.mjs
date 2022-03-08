import { PostModel } from "../models/index.mjs";
import { UserModel } from "../models/userModel.mjs";

export const UserRepo = {
  list: async () => {
    try {
      const users = await UserModel.findAll();
      return users;
    } catch (error) {
      return error.message;
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findOne({ where: { id: id } });
      return user;
    } catch (error) {
      return error.message;
    }
  },
  create: async (req, res) => {
    try {
      const user = await UserModel.create(req.body);
      return user;
    } catch (error) {
      return error.message;
    }
  },
  update: async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let { id } = req.params;
      const user = await UserModel.update({
        username: username,
        email: email,
        password: password,
      },
      {where : {id : id},
      returning : true,
      plain: true
    },
      );
      return user[1].dataValues;
    } catch (error) {
      return error.message;
    }
  },
  delete : async (req,res) => {
    try {
      let { id } = req.params;
      await UserModel.destroy({  
      where : {id : id}
    },
      );
      return 204;
    } catch (error) {
      return error.message;
    }
  },
  getPosts : async(req,res) => {
    try {
      let {id} = req.params;
      const userPosts = await UserModel.findOne({
        where : {id : id},
        include : [{
          model : PostModel,
          where : {userId : id}
        }]
      })
      return userPosts;
    }
    catch (error) {
      return error.message;
    }
  }
};