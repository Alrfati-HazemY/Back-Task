export const PostSchema = (db,type) => {
    return db.define('posts',{
        id : {
            type : type.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        title : {
            type: type.STRING,
            allowNull : false,
        },
        content : {
            type : type.STRING,
            allowNull : false,
        },
        userId: {
            type: type.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }
    },
    {
        timestamps : false
      }
    )
}