module.exports = (db, type) => {
    return db.define('users', {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: type.STRING,
        allowNull: false,
        validate: {
          is: ["^[a-z]+$", 'i']
        }
      },
      email : {
          type : type.STRING,
          allowNull : false,
          validate : {
              isEmail : true
          }
      },
      password : {
          type : type.STRING, 
          allowNull : false, 
      }
    },
    {
        timestamps : false
      }
    )
}