require('dotenv').config()
const {Sequelize} = require('sequelize')

const db = process.env.SQL_DATABASE
const pass =process.env.SQL_PASSWORD
const host = process.env.SQL_HOST
const Uname = process.env.SQL_USERNAME
const dialect = process.env.SQL_DIALECT
const sequelize = new Sequelize(db, Uname, pass, {
  host: host ,
  dialect: dialect 
});

module.exports = sequelize 