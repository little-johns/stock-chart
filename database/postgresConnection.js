const Sequelize = require('sequelize');
const { POSTGRES_USER, POSTGRES_PASSWORD } = require('../config.js');

const sequelize = new Sequelize('stockchart', POSTGRES_USER, POSTGRES_PASSWORD, {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres'
});

exports.sequelize = sequelize;