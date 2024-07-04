
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dudwnszero99:nodejs@cluster1.k5bjxhc.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const adminDB = client.db('test').admin();
  const listDatabases = await adminDB.listDatabases();
  console.log(listDatabases);
  return "OK";
}

run()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
