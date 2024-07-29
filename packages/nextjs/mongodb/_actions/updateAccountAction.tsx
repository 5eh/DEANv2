"use server";

import connectToDatabase from "~~/mongodb/database";
import UserModel from "~~/mongodb/models/UserModal";

export async function updateAccount(wallet: string, field: string, value: any) {
  if (!wallet) {
    throw new Error("Wallet address is required");
  }

  await connectToDatabase();

  try {
    const update = {};
    update[field] = value;

    const result = await UserModel.updateOne({ wallet }, { $set: update });

    if (result.nModified === 0) {
      throw new Error("No matching account found or no changes made");
    }

    return { msg: "Account updated successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
