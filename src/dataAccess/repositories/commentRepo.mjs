import { CommentModel } from "../models/index.mjs";

export const CommentRepo = {
    list : async () => {
          try {
            const comments = await CommentModel.findAll();
            return comments;
          } 
          catch (error) {
            return error.message;
          }
        },
    get : async (req, res) => {
        try {
          const {id} = req.params;
          const comment = await CommentModel.findOne({
              where : {id : id}
          });
          return comment;
        } 
        catch (error) {
          return error.message;
        }
      },
    create : async (req,res) => {
        try{
            console.log("Sfd")
            const comment = await CommentModel.create(req.body);
            return comment;
        }
        catch(error){
            return error.message
        }
    },
    update : async (req,res) => {
        try{
            const {id} = req.params;
            const {title , content} = req.body ;
            const comment = await CommentModel.update({
               title : title,
               content : content
            },
            { where : {id : id},
                returning : true,
                plain : true
            }
            );
            return comment[1].dataValues;
        }
        catch(error){
            return error.message
        }
    },
    delete : async(req,res) => {
        try{
            const {id} = req.params;
            await CommentModel.destroy({
                where : {id:id}
            })
            return 204;
        }
        catch(error) {
            return error.message
        }
    }
}