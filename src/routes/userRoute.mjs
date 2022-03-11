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
  const userData = req.body
  const user = await UserRepo.create(userData);
  res.status(201).json(user);
})

router.route("/:id")
.get(async(req,res)=>{
  const { id } = req.params;
  const user = await UserRepo.get(id);
  res.json(user);
})
.put(validation(userSchemaValidation),async(req,res)=>{
  let userData = req.body;
  const { id } = req.params;
  const user = await UserRepo.update(id,userData);
  res.json(user);
})
.delete(async(req,res)=>{
  const { id } = req.params;
  const user = await UserRepo.delete(id);
  res.sendStatus(user);
})

router.route("/:id/posts").get(async(req,res)=>{
  const {id} = req.params;
  const userPosts = await UserRepo.getPosts(id);
  res.json(userPosts);
});

export {router as UserRouter};
