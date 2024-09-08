import mongoose from "mongoose";          


let isConnected = false;               //Variable to track the connection status

//everytime we make API request/server_action we will check & use this function in the controllers (Because we're not using Node index.js server file)
export const connectToDB = async () => {  
  if (isConnected) return;        // If the connection is already established, return without creating a new connection.
  try {
    await mongoose.connect(process.env.MONGODB_URL);     //create new DB Connection & pass mongoDB Key
    isConnected = true;                                  // Set the connection status Variable to true
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);           //catch the errors
  }
};