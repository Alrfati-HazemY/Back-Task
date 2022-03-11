import express from 'express'
import bodyParser from 'body-parser'
import {db} from './db.mjs'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import {UserRouter} from './routes/userRoute.mjs' 
import {PostRouter} from './routes/postRoute.mjs' 
import {CommentRouter} from './routes/commentRoute.mjs' 

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/posts", PostRouter);
app.use("/api/v1/comments", CommentRouter);


app.get("/", (req, res) => {
  res.send("Welocme To Node API!");
});

export const server = app.listen(9500, () => {
  console.log("Listen is done");
});