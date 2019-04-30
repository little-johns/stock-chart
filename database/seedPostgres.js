const sequelize = require('./postgresConnection.js');

const dataPath = 'c:/Users/chris/HackReactor/SDC/stock-chart/database/data.csv';

sequelize.sync({ force: true })
  .then(() => sequelize.query(`COPY stocks FROM '${dataPath}' DELIMITER('|') CSV HEADER;`)
    .then(() => console.log('done'))
  );