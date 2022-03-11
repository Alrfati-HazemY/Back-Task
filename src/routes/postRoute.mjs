import express from "express"
import { PostRepo } from "../dataAccess/repositories/postRepo.mjs";
import { postSchemaValidation, validation } from "../helper/validationSchema.mjs";
const router = express.Router();

router.route("/")
.get(async (req,res)=>{
  const posts = await PostRepo.list();
  res.json(posts);
})
.post(validation(postSchemaValidation),async(req,res)=>{
  let postData = req.body
  let {post , status , error} = await PostRepo.create(postData);
  res.status(status).json(post || error.message);
})
router.route("/:id")
.get(async(req,res)=>{
  const {id} = req.params
  const post = await PostRepo.get(id);
  res.json(post);
})
.put(validation(postSchemaValidation),async(req,res)=>{
  const { id } = req.params;
  let postData = req.body;
  const post = await PostRepo.update(id,postData);
  res.json(post);
})
.delete(async(req,res)=>{
  const { id } = req.params;
  const post = await PostRepo.delete(id);
  res.sendStatus(post);
});

router.route("/:id/comments")
.get(async(req,res)=>{
  const {id} = req.params;
  const postComments = await PostRepo.getComments(id);
  res.json(postComments);
});

export {router as PostRouter}
