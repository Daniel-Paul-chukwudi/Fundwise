const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('Fundwise', 'root', 'root', { 
  host: 'localhost',
  dialect:'mysql'
});

module.exports = sequelize 