"use server";

/**  use server is used for the new server actions , instead of using (req,res) we get formData directly **/

import { Product, User } from "./models";
import { connectToDB } from "./DB-connection";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { signIn , signOut } from "../auth";                     //functions we got from NextAuth lib



//addUser function to add new user to the DB  .. (prevState) is for useFormState in the client component
export const addUser = async (prevState,formData) => {
  //get the user data we received from the form directly using the formData object 
  const { username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);
  try {
    connectToDB();               //connect DB function
    //hashing the password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create instance from the User model & pass the recieved new user data
    const newUser = new User({ username, email, password: hashedPassword, phone, address, isAdmin, isActive });
    await newUser.save();           //save the new user to the Database
  } catch (err) {
    if (err.message.includes("duplicate key error")) {
      return "user already exist!";                       //'user or email already exist' error message
    }
    throw err;
  }
  //After adding new user , refresh the data on users table page & redirect to it
  revalidatePath("/dashboard/users");      
  redirect("/dashboard/users");
};


//authenticate function to login The user , using login function from auth.js file .. (prevState) is for useFormState in the client component
export const authenticate = async (prevState, formData) => {
  //get the username & password we received from the form directly using the formData object 
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { username, password });    //credentials is the provider-name here , it can be google , facebook , ...
  } catch (err) {    
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";                       //login error message
    }
    throw err;
  }
};   


//logout function to log out the current user
export const logout = async () => {  
  await signOut();                  //log out the user using signOut() of NextAuth (auth.js file)  
  redirect("/login");               //After logout the user , redirect to login page    
};


//updateUser function to update user data in the DB 
export const updateUser = async (formData) => {
  //get the user data we received from the form directly using the formData object
  const { id, username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);
  try {
    connectToDB();               //connect DB function
   //create instance from the User model & pass the recieved updated user data
    const updateFields = { username, email, password, phone, address, isAdmin, isActive };
    //Loop through (updateFields object) if a field is empty or unundefined , then delete it from the object
    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
    await User.findByIdAndUpdate(id, updateFields);     //find the user by id and update it with the updateFields
  } catch (err) {
    console.log(err);               //log the errors
    throw new Error("Failed to update user!");
  }
  //After updating the user , refresh the data on users table page & redirect to it
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};


//addProduct function to add new product to the DB 
export const addProduct = async (formData) => {
  //get the product data we received from the form directly using the formData object
  const { title, desc, price, stock, color, size } = Object.fromEntries(formData);
  try {
    connectToDB();               //connect DB function
    //create instance from the Product model & pass the recieved new product data
    const newProduct = new Product({ title, desc, price, stock, color, size });
    await newProduct.save();         //save the new product to the Database   
  } catch (err) {
    console.log(err);                //log the errors
    throw new Error("Failed to create product!");
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
    throw new Error("Failed to update product!");
  }
  //After updating the product , refresh the data on products table page & redirect to it
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};


//deleteUser function to delete a user from the DB 
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);          //get the user id we received , using the formData object
  try {
    connectToDB();               //connect DB function
    await User.findByIdAndDelete(id);                   //find the user by id and delete it 
  } catch (err) {
    console.log(err);            //log the errors
    throw new Error("Failed to delete user!");
  }
  //After deleting the user , refresh the data on users table page 
  revalidatePath("/dashboard/users");
};


//deleteProduct function to delete a product from the DB 
export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);           //get the product id we received , using the formData object
  try {
    connectToDB();               //connect DB function
    await Product.findByIdAndDelete(id);                 //find the product by id and delete it  
  } catch (err) {
    console.log(err);            //log the errors
    throw new Error("Failed to delete product!");
  }
  //After deleting the product , refresh the data on products table page 
  revalidatePath("/dashboard/products");
};



