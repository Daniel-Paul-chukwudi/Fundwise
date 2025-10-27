require('dotenv').config()
const db = process.env.SQL_DATABASE
const Uname = process.env.SQL_USERNAME
const pass =process.env.SQL_PASSWORD
const host = process.env.SQL_HOST
module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "trustforge",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": Uname,
    "password": pass,
    "database": db,
    "host": host,
    "dialect": "mysql"
  }
}
