import express from "express";
import { CommentRepo } from "../dataAccess/repositories/commentRepo.mjs";
import {
  validation,
  commentSchemaValidation,
} from "../helper/validationSchema.mjs";
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const comments = await CommentRepo.list();
    res.json(comments);
  })
  .post(validation(commentSchemaValidation), async (req, res) => {
    const commentData = req.body;
    const {comment , status , error} = await CommentRepo.create(commentData);
    res.status(status).json(comment || error.message);
  });
router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const comment = await CommentRepo.get(id);
    res.json(comment);
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const commentData = req.body;
    const comment = await CommentRepo.update(id,commentData);
    res.json(comment);
  })
  .delete(async (req, res) => {
    const {id} = req.params
    const comment = await CommentRepo.delete(id);
    res.sendStatus(comment);
  });

export { router as CommentRouter };
