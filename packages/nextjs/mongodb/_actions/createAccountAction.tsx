// packages/nextjs/app/api/createAccountAction.ts

"use server";

import AccountCreationModel from "~~/mongodb/models/createAccountModel";
import connectDB from "~~/mongodb/database";

export async function createAccount(wallet: string, username: string, email: string) {
  try {
    await connectDB();

    const existingUser = await AccountCreationModel.findOne({
      $or: [{ wallet }, { username }, { email }],
    });

    if (existingUser) {
      let errorMessage = "The following field(s) are already registered: ";
      if (existingUser.wallet === wallet) errorMessage += "Wallet ";
      if (existingUser.username === username) errorMessage += "Username ";
      if (existingUser.email === email) errorMessage += "Email";
      return { errMsg: errorMessage };
    }

    const newUser = new AccountCreationModel({ username, email, wallet });
    await newUser.save();

    return { msg: "Account created successfully" };
  } catch (error) {
    return { errMsg: error.message };
  }
}
