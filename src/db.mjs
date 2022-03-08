import {config} from './config/config.mjs'
import {Sequelize} from 'sequelize'
export const db = new Sequelize(config["development"]);