"use server";

import connectToDatabase from "~~/mongodb/database";
import ReadAccountModel from "~~/mongodb/models/readAccountModel";

export async function readAccount(wallet: string) {
  if (!wallet) {
    throw new Error("Wallet address is required");
  }

  await connectToDatabase();

  try {
    const user = await ReadAccountModel.findOne({ wallet }).lean();

    if (!user) {
      throw new Error("User not found");
    }

    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
