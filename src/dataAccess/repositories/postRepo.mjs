import { PostModel } from "../models/postModel.mjs";
import { CommentModel } from "../models/commentModel.mjs";
export const PostRepo = {
  list: async () => {
    const posts = await PostModel.findAll();
    return posts;
  },
  get: async (id) => {
      const post = await PostModel.findOne({ where: { id: id } });
      return post === null ? {} : post;
  },
  create: async (postData) => {
    try {
      const post = await PostModel.create(postData);
      return {post , status:201};
    } catch (error) {
      return {error , status:200};
    }
  },
  update: async (id,postData) => {
      const {title  ,content} = postData
      let post = await PostModel.update(
        {
          title: title,
          content: content,
        },
        { where: { id: id }, returning: true, plain: true }
      );
      post = await PostRepo.get(id);
      return post;
      // return post[1].dataValues;
  },
  delete: async (id) => {
      await PostModel.destroy({
        where: { id: id },
      });
      return 204;
  },
  getComments: async (id) => {
      const postComments = await PostModel.findOne({
        where: { id: id },
        include: [
          {
            model: CommentModel,
            where: { postId: id },
          },
        ],
      });
      return postComments;
  },
};
