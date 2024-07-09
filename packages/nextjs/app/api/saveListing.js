import { connectToDb } from "~~/hooks/mongodb"; // Adjust the path accordingly

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { args } = req.body;

    try {
      const db = await connectToDb();
      const collection = db.collection("Listings_001");
      await collection.insertOne({ args });

      res.status(200).json({ message: "Listing saved to MongoDB", args });
    } catch (error) {
      console.error("Error saving listing to MongoDB:", error);
      res.status(500).json({ error: "Failed to save listing" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
