const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URL || "mongodb+srv://rovaris:1234567a@cryptomuseum.nn6tk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let client = new MongoClient(url);
let connection;
let database;

async function init_db(){
  client = new MongoClient(url);

  try {
    connection = await client.connect();
    database = await client.db('cryptoMuseum');
    console.log("Conectado");

  } catch (e) {
    console.log(e);

  }

  return database;
}

async function get_db() {
  return database || await init_db()
}

module.exports = {
    init_db,
    get_db
};
