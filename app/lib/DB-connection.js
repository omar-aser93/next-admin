import mongoose from "mongoose";           //check mongoose docs 


const connection = {};

//everytime we make api request we will import & use this function in the controllers (Because we're not using Node index.js server file)
export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;            //Check if already connected then don't do anything
    //new connection
    const db = await mongoose.connect(process.env.MONGO); 
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {            //get errors
    console.log(error)
    throw new Error(error);
  }
};