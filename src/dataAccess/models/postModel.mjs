import {UserModel} from './index.mjs';
import {PostModel} from './index.mjs';
import {CommentModel} from './index.mjs'

PostModel.belongsTo(UserModel);
PostModel.hasMany(CommentModel);

export {PostModel};
