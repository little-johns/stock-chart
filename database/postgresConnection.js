const pg = require('pg');
const { POSTGRES_USER, POSTGRES_PASSWORD } = require('../config.js');
// const connectionString = 'postgres://localhost:5432/stock-chart'

const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: 'stockchart'
});

client.connect(err => {if (err) console.error(err.stack)});
