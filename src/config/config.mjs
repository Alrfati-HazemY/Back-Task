import dotenv from 'dotenv'
dotenv.config()

export const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.PORT,
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.PORT,
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  },
  test : {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.PORT,
    host: 'localhost',
    dialect: 'sqlite',
    logging: false
  },
}

