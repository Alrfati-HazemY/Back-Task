import express from "express";
import { CommentRepo } from "../dataAccess/repositories/commentRepo.mjs";
import { validation , commentSchemaValidation } from "../helper/validationSchema.mjs";
const router = express.Router();

router.route("/")
.get(async(req,res)=>{
  const comments = await CommentRepo.list();
  res.json(comments);
})
.post(validation(commentSchemaValidation),async(req,res)=>{
  const comment = await CommentRepo.create(req);
  res.json(comment);
});

router.route("/:id")
.get(async(req,res)=>{
  const comment = await CommentRepo.get(req);
  res.json(comment)
})
.put(async(req,res)=>{
  const comment = await CommentRepo.update(req);
  res.json(comment)
})
.delete(async(req,res)=>{
  const comment = await CommentRepo.delete(req);
  res.json(comment)
})

export {router as CommentRouter}



