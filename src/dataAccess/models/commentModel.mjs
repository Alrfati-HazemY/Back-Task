import {UserModel} from './index.mjs'
import {PostModel} from './index.mjs'
import {CommentModel} from './index.mjs'

CommentModel.belongsTo(PostModel);
CommentModel.belongsTo(UserModel);

export {CommentModel};