import mongoose from "mongoose";

let connected = false;
const connectdb = async () => {
  mongoose.set("strictQuery", true); // It Mean the attributes define in our Schema will only be store in the database.

  //   if the app is already connect to database, don't connect it again.
  if (connected) {
    console.log("Already conntect to the database...");
    return;
  }
  // connect to database.
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connectdb = true;
    console.log("Conntect to database successfully....");
  } catch (error) {
    console.log("Faild to connect to the database : ", error);
  }
};

export default connectdb;
