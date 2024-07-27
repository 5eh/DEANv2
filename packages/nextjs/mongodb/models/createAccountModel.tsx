// packages/nextjs/models/userModel.ts

import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    wallet: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const AccountCreationModel = models.User || model("User", userSchema);
export default AccountCreationModel;
