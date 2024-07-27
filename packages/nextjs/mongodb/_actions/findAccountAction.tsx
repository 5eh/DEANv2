"use server";

import connectDB from "~~/mongodb/database";
import AccountCreationModel from "~~/mongodb/models/createAccountModel";

export async function findAccountInformation(wallet) {
  try {
    await connectDB();
    const data = await AccountCreationModel.findOne({ wallet });

    if (data) {
      return { success: true, data: JSON.parse(JSON.stringify(data)) };
    } else {
      return { success: false, message: "Wallet address not found in MongoDB" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}
