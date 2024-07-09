"use server";
const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectToDb = async () => {
  if (db) return db;

  const uri = process.env.MONGODB_CONNECTION;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    db = client.db("Listings");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }

  return db;
};

const saveListing = async args => {
  const db = await connectToDb();
  const collection = db.collection("Listings");
  await collection.insertOne({ args });
  console.log("Listing saved to MongoDB:", args);
};

module.exports = { connectToDb, saveListing };
