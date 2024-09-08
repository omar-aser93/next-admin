"use server";
/** use server is used for the server actions (not necessary for fetch reqests, only post,update,delete,..)  **/

import { Product } from "../models";
import { connectToDB } from "../DB-connection";
import { redirect } from "next/navigation";         //similar to routter.push(), but doesn't push a new entry into browser history stack, usually used with server
import { revalidatePath } from "next/cache";        //used with (post,delete,update) actions to refresh data directly after change, but not with (fetch) we use return directly



//fetchProducts function to get all Products from the DB 
export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");            //create regular expressions for received search query (case-insensitive)
  const ITEM_PER_PAGE = 2;                     //number of items for each page
  try {
    connectToDB();              //connect DB function
    //get products count for pagination , get all products & limit data to items per page 
    const count = await Product.find({ title: { $regex: regex } }).countDocuments();
    const products = await Product.find({ title: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };             //response with the products & the count 
  } catch (err) {
    console.log(err);          //log the errors
    return "Failed to fetch products!" ;
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
    return "Failed to fetch product!" ;
  }
};



//addProduct function to add new product to the DB .. (prevState) is for useFormState in the client component
export const addProduct = async (prevState,formData) => {
  //get the product data we received from the form directly using the formData object
  const { title, desc, price, stock, color, size } = Object.fromEntries(formData);
  try {
    connectToDB();               //connect DB function
    //create instance from the Product model & pass the recieved new product data
    const newProduct = new Product({ title, desc, price, stock, color, size });
    await newProduct.save();         //save the new product to the Database   
  } catch (err) {
    console.log(err);                //log the errors
     return "Failed to create product!";
  }
  //After adding new product , refresh the data on products table page & redirect to it
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};



//updateProduct function to update product data in the DB 
export const updateProduct = async (formData) => {
  //get the product data we received from the form directly using the formData object  
  const { id, title, desc, price, stock, color, size } = Object.fromEntries(formData);
  try {
    connectToDB();               //connect DB function
   //create instance from the Product model & pass the recieved updated user data
    const updateFields = { title, desc, price, stock, color, size };
    //Loop through (updateFields object) if a field is empty or unundefined , then delete it from the object
    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
    await Product.findByIdAndUpdate(id, updateFields);   //find the product by id and update it with the updateFields
  } catch (err) {
    console.log(err);                //log the errors
    return "Failed to update product!";
  }
  //After updating the product , refresh the data on products table page & redirect to it
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};



//deleteProduct function to delete a product from the DB 
export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);           //get the product id we received , using the formData object
  try {
    connectToDB();               //connect DB function
    await Product.findByIdAndDelete(id);                 //find the product by id and delete it  
  } catch (err) {
    console.log(err);            //log the errors
    return "Failed to delete product!";
  }
  //After deleting the product , refresh the data on products table page 
  revalidatePath("/dashboard/products");
};
