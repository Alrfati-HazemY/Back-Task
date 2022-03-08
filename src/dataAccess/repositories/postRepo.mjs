import { PostModel } from "../models/postModel.mjs";
import { CommentModel } from "../models/commentModel.mjs";
export const PostRepo = {
  list: async (req, res) => {
    try {
      const posts = await PostModel.findAll();
      return posts;
    } catch (error) {
      return error.message;
    }
  },
  get : async (req,res) => {
    try {
      let {id} = req.params
      const post = await PostModel.findOne({where : {id : id}})
      return post;
    }
    catch(error) {
      return error.message
    }
  },
  create :  async (req,res) => {
    try {
      const post = await PostModel.create(req.body)
      return post;
    }
    catch(error) {
      return error.message
    }
  },
  put : async(req,res) => {
    try {
      let {id} = req.params;
      let {title , content} = req.body;
      const post = await PostModel.update({
        title : title,
        content : content,
      },
        {where : {id : id},
        returning : true,
        plain: true
      }
      )
      return post[1].dataValues;
    }
    catch(error) {
      return error.message
    }
  },
  delete : async(req,res) => {
    try {
      const {id} = req.params;
      await PostModel.destroy({
        where : {id : id}
      });
      return 204;
    }
    catch(error) {
      return error.message;
    }
  },
  getComments : async(req,res)=> {
    try {
      let {id} = req.params;
      console.log(id)
      const postComments = await PostModel.findOne({
        where : {id : id},
        include : [{
          model : CommentModel,
          where : {postId : id}
        }]
      })
      return postComments;
    }
    catch(error) {
      return error.message;
    }
  }
};