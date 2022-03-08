import express from "express";
import {UserRepo} from '../dataAccess/repositories/userRepo.mjs'
import { userSchemaValidation, validation } from "../helper/validationSchema.mjs";

const router = express.Router();

router.route("/")
.get(async (req,res)=>{
  const users = await UserRepo.list();
  res.json(users);
})
.post(validation(userSchemaValidation),async(req,res)=>{
  const user = await UserRepo.create(req,res);
  res.json(user);
})

router.route("/:id")
.get(async(req,res)=>{
  const user = await UserRepo.get(req);
  res.send(user);
})
.put(async(req,res)=>{
  const user = await UserRepo.update(req);
  res.send(user);
})
.delete(async(req,res)=>{
  const user = await UserRepo.delete(req);
  res.sendStatus(user);
})

router.route("/:id/posts").get(async(req,res)=>{
  const userPosts = await UserRepo.getPosts(req);;
  res.send(userPosts);
});

export {router as UserRouter};
