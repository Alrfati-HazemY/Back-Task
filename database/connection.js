const config = require("./../config/config.json")["development"];
// console.log("__config__", config);
const Sequelize = require("sequelize");
module.exports = new Sequelize(config);
