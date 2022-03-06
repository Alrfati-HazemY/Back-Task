// Important require
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./database/connection");

// configure app to use bodyParser()
// this will let us to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// require routes
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api/v1/

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/comments", commentsRouter);

// Testing Connection
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Home Page
app.get("/", (req, res) => {
  res.send("hello awesomes!");
});

module.exports = app.listen(5000, () => {
  console.log("Listen is done");
});
