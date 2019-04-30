/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

const redisClient = redis.createClient();
const getAsync = require('util').promisify(redisClient.get).bind(redisClient);

const Stock = require('../database/StockChartPostgres.js');

const app = express();
const port = 4000;
const useRedis = true;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/../public/dist')));

app.listen(port, () => {
  console.log(`Server is now listening on port: ${port}`)
})

const setRedis = (i, response) => {
  redisClient.set(i, JSON.stringify(response))
}

let i = 6600000;
const seedRedis = () => {
  if (i >= 10000000) {
    console.log('done');
    return;
  }

  getAsync(i)
  .then(result => {
    if (result) {
      if (i % 100000 === 0) {
        console.log(i);
      }
      i += 1;
      seedRedis();
    } else {
      if (i % 100000 === 0) {
        console.log(i, 'not found');
      }
      Stock.getStock(i, (err, response) => {
        if (err) {
          console.log(err.message);
        } else {
          setRedis(i, response);
        }
        i += 1;
        seedRedis();
      });
    }
  })
  .catch(error => console.log('error', error));
}

app.get('/api/:stockId', (req, res) => {
  if (useRedis) {
    getAsync(req.params.stockId)
      .then(result => {
        if (result) {
          res.send([JSON.parse(result)]);
          return;
        } else {
          useDatabase();
        }
      })
      .catch(error => console.log('error', error));
  } else{
    useDatabase();
  }

  const useDatabase = () => {
    Stock.getStock(req.params.stockId, (err, response) => {
      if (err) {
        console.log(err.message);
      } else {
        redisClient.set(req.params.stockId, JSON.stringify(response))
        res.send([response]);
      }
    });
  }
});

app.get('/:stockId', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/dist/index.html'));
})

// seedRedis();