const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'stockchart' });

const query = `CREATE TABLE stocks (
  id INT,
  stockId TEXT,
  stockCompany TEXT,
  relatedTags set<TEXT>,
  noOfOwners INT,
  recommendationPercent FLOAT,
  averageStock FLOAT,
  day set<FLOAT>,
  week set<FLOAT>,
  month set<FLOAT>,
  threeMonth set<FLOAT>,
  year set<FLOAT>,
  fiveYear set<FLOAT>,
  changePercent FLOAT,
  PRIMARY KEY (id)
)`;
  

client.execute(query)
  .then(result => {console.log('table created'); process.exit();});

