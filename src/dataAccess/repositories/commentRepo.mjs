import { CommentModel } from "../models/commentModel.mjs";

export const CommentRepo = {
  list: async () => {
    const comments = await CommentModel.findAll();
    return comments;
  },
  get: async (id) => {
    const comment = await CommentModel.findOne({
      where: { id: id },
    });
    return comment === null ? {} : comment;
  },
  create: async (commentData) => {
    try {
      const comment = await CommentModel.create(commentData);
      return {comment , status:201};
    } catch (error) {
      return {error , status:200};
    }
  },
  update: async (id, commentData) => {
      const { title, content } = commentData;
      let comment = await CommentModel.update(
        {
          title: title,
          content: content,
        },
        { where: { id: id }, returning: true, plain: true }
      );
      comment = await CommentRepo.get(id);
      return comment;
    //   return comment[1].dataValues;
   
  },
  delete: async (id) => {
      await CommentModel.destroy({
        where: { id: id },
      });
      return 204;
  },
};
