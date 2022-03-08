import {db} from '../../db.mjs'
import {Sequelize} from 'sequelize'
import {UserSchema} from '../schemas/userSchema.mjs'
import {PostSchema} from '../schemas/postSchema.mjs'
import {CommmentSchema} from '../schemas/commentSchema.mjs'

const UserModel = UserSchema(db,Sequelize)
const PostModel = PostSchema(db,Sequelize)
const CommentModel = CommmentSchema(db,Sequelize)

db.sync({ force: false }).then(() => {
  console.log("Tables Created!");
});

export {UserModel , PostModel , CommentModel}