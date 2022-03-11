import {UserModel} from './index.mjs'
import {PostModel} from './index.mjs'
import {CommentModel} from './index.mjs'

UserModel.hasMany(PostModel);
UserModel.hasMany(CommentModel);

export {UserModel};