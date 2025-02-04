import mongoose from "mongoose";
import config from "../config";

async function main() {
  try {
    await mongoose.connect(config.db_url_local as string);
    console.log(`Database connected successfully on port ${config.port}`);
  } catch (err) {
    console.log(`DB connection Error: ${err}`);
  }
}

export default main;
