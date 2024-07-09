const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_CONNECTION;

if (!uri) {
  console.error("MONGODB_CONNECTION environment variable is not set.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to the database");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
