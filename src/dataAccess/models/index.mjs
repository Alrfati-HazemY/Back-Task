import seq from "sequelize";
import { db } from "../../db.mjs";
import { UserSchema } from "../schemas/userSchema.mjs";
import { PostSchema } from "../schemas/postSchema.mjs";
import { CommmentSchema } from "../schemas/commentSchema.mjs";

const UserModel = UserSchema(db, seq.Sequelize);
const PostModel = PostSchema(db, seq.Sequelize);
const CommentModel = CommmentSchema(db, seq.Sequelize);

db.sync({ force: false }).then(() => {
  console.log("Tables Created!");
});

export { UserModel, PostModel, CommentModel };
