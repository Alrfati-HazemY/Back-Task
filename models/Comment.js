module.exports = (db,type) => {
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
    }
}    
    )
}