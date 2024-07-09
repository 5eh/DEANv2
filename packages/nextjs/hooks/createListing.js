"use server";

const { MongoClient } = require("mongodb");

async function createListing(listingID, title, description) {
  const uri = process.env.MONGODB_CONNECTION;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("Listings");
    const collection = db.collection("Listings_001");
    const result = await collection.insertOne(listingID, title, description);
    console.log(`New listing created with the following id: ${result}`);
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export default createListing;
