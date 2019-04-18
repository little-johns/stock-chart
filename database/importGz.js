const db  = require('./index.js');
const StockChart = require('./StockChart.js');

var readline = require('readline');
console.log('running');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lines = '';
rl.on('line', function (line) {
  line = JSON.parse(line);
  StockChart.create({...line})
  // console.log(JSON.parse(line))
})
