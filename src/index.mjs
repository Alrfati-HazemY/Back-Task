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

// Testing Connection
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
});

app.get("/", (req, res) => {
  res.send("hello awesomes!");
});

export const server = app.listen(5000, () => {
  console.log("Listen is done");
});
