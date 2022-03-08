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
  const post = await PostRepo.create(req,res);
  res.json(post);
})

router.route("/:id")
.get(async(req,res)=>{
  const post = await PostRepo.get(req);
  res.json(post);
})
.put(async(req,res)=>{
  const post = await PostRepo.put(req);
  res.json(post);
})
.delete(async(req,res)=>{
  const post = await PostRepo.delete(req);
  res.json(post);
});

router.route("/:id/comments")
.get(async(req,res)=>{
  const postComments = await PostRepo.getComments(req);
  res.json(postComments);
});

export {router as PostRouter}
