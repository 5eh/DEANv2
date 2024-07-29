import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    location: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { strict: false, timestamps: true },
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
