const Sequelize = require('sequelize');
const { POSTGRES_USER, POSTGRES_PASSWORD } = require('../config.js');

const sequelize = new Sequelize('stockchart', POSTGRES_USER, POSTGRES_PASSWORD, {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres'
});

class Stock extends Sequelize.Model {}
Stock.init({
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
}, { sequelize, modelName: 'stock', timestamps: false });

const dataPath = 'c:/Users/chris/HackReactor/SDC/stock-chart/database/data.csv';

sequelize.sync({ force: true })
  .then(() => sequelize.query(`COPY stocks FROM '${dataPath}' DELIMITER('|') CSV HEADER;`)
    .then(() => console.log('done'))
  );
 
