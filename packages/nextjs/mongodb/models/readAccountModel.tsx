// Retrieve account data from database based on ht e userwallet, or username.

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      required: true,
      unique: true,
    },
    // Add other fields as needed
  },
  { timestamps: true },
);

const ReadAccountModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default ReadAccountModel;
