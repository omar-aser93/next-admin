import { Product, User } from "./models";
import { connectToDB } from "./DB-connection";

//fetchUsers function to get all users from the DB 
export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");            //create regular expressions for received search query (case-insensitive)
  const ITEM_PER_PAGE = 2;                     //number of items for each page
  try {
    connectToDB();              //connect DB function
    //get uers count for pagination , get all users & limit data to items per page 
    const count = await User.find({ username: { $regex: regex } }).count();        
    const users = await User.find({ username: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };        //response with the users & the count
  } catch (err) {     
    console.log(err);          //log the errors
    throw new Error("Failed to fetch users!");
  }
};


//fetchUser function to get a single user from the DB 
export const fetchUser = async (id) => {
  try {
    connectToDB();                             //connect DB function
    const user = await User.findById(id);      //find the user by its id
    return user;                               //response with the user
  } catch (err) {
    console.log(err);             //log the errors
    throw new Error("Failed to fetch user!");
  }
};


//fetchProducts function to get all Products from the DB 
export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");            //create regular expressions for received search query (case-insensitive)
  const ITEM_PER_PAGE = 2;                     //number of items for each page
  try {
    connectToDB();              //connect DB function
    //get products count for pagination , get all products & limit data to items per page 
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };             //response with the products & the count 
  } catch (err) {
    console.log(err);          //log the errors
    throw new Error("Failed to fetch products!");
  }
};


//fetchProduct function to get a single Product from the DB 
export const fetchProduct = async (id) => {
  try {
    connectToDB();                                     //connect DB function
    const product = await Product.findById(id);        //find the product by its id
    return product;                                    //response with the product
  } catch (err) {
    console.log(err);          //log the errors
    throw new Error("Failed to fetch product!");
  }
};

