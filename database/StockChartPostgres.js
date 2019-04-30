const Sequelize = require('sequelize');
const Pool = require('pg').Pool;

const pgConnection = require('./postgresConnection.js');
const { POSTGRES_USER, POSTGRES_PASSWORD } = require('../config.js');

const sequelize = pgConnection.sequelize;

// class Stock extends Sequelize.Model {}
exports.Stock = sequelize.define('Stock', {
// Stock.init({
  id: {type: Sequelize.INTEGER, primaryKey: true },
  stockId: Sequelize.TEXT,
  stockCompany: Sequelize.TEXT,
  relatedTags: Sequelize.ARRAY(Sequelize.TEXT),
  noOfOwners: Sequelize.INTEGER,
  recommendationPercent: Sequelize.FLOAT,
  day: Sequelize.ARRAY(Sequelize.FLOAT),
  week: Sequelize.ARRAY(Sequelize.FLOAT),
  month: Sequelize.ARRAY(Sequelize.FLOAT),
  threeMonth: Sequelize.ARRAY(Sequelize.FLOAT),
  year: Sequelize.ARRAY(Sequelize.FLOAT),
  fiveYear: Sequelize.ARRAY(Sequelize.FLOAT),
  averageStock: Sequelize.FLOAT,
  changePercent: Sequelize.FLOAT,
})//, { sequelize, modelName: 'stock', timestamps: false });


const pool = new Pool({
  user: POSTGRES_USER,
  host: 'localhost',
  database: 'stockchart',
  password: POSTGRES_PASSWORD,
  port: 5432,
})

exports.getStock = (id, cb) => {
  let query = '';
  if (parseInt(id)) {
    query = `SELECT * FROM stocks WHERE id=${id};`;
  } else {
    query = `SELECT * FROM stocks WHERE "stockId"='${id}';`
  }
  pool.query(query, (err, res) => {
    if (err || !res.rows.length) {
      cb(err);
    } else {
      let result = res.rows[0];
      cb(null, result);
    }
  });
}