"use server";

import PostModel from "../models/postModel";
import connectDB from "../database";

export async function getPosts() {
  try {
    await connectDB();
    const data = await PostModel.find();

    console.log(data);

    return { msg: "GET" };
  } catch (error) {
    return { errMsg: error.message };
  }
}
