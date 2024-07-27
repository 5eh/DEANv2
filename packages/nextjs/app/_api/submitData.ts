import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../utils/mongodb";
import User from "../../models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({ message: "Name and email are required" });
      return;
    }

    try {
      await connectToDatabase();
      const user = new User({ name, email });
      await user.save();
      res.status(200).json({ message: "Data submitted successfully!" });
    } catch (error) {
      console.error("Failed to submit data", error);
      res.status(500).json({ message: "Failed to submit data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
