export const CommmentSchema = (db,type) => {
    return db.define("comments",{
        id : {
        type :type.INTEGER,
        primaryKey:true,
        autoIncrement : true,
        allowNull : false
    },
    title : {
        type : type.STRING,
        allowNull:false,
    },
    content : {
        type : type.STRING,
        allowNull : false
    },
    userId: {
        type: type.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    },
    postId: {
        type: type.INTEGER,
        references: {
            model: 'posts',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    }
}    
    )
}