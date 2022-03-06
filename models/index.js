// import sequelize & schemas
const Sequelize = require("sequelize");
const db = require("../database/connection");

const UserModel = require("./User");
const PostModel = require("./Post");
const CommentModel = require("./Comment");

// create models
const User = UserModel(db, Sequelize);
const Post = PostModel(db, Sequelize);
const Comment = CommentModel(db, Sequelize);

// define relations

// User & Post [one to many]
User.hasMany(Post);
Post.belongsTo(User);

// Post & Comment [one to many]
Post.hasMany(Comment);
Comment.belongsTo(Post);

// User Comment [one to many]
User.hasMany(Comment);
Comment.belongsTo(User);

db.sync({ force: false }).then(() => {
  console.log("Tables Created!");
});

module.exports = {
  User,
  Post,
  Comment,
};
