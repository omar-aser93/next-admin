"use server";
/** use server is used for the server actions (not necessary for fetch reqests, only post,update,delete,..)  **/

import { User } from "../models";
import { connectToDB } from "../DB-connection";
import { redirect } from "next/navigation";         //similar to routter.push(), but doesn't push a new entry into browser history stack, usually used with server
import { revalidatePath } from "next/cache";        //used with (post,delete,update) actions to refresh data directly after change, but not with (fetch) we use return directly
import bcrypt from "bcryptjs";
import { signIn , signOut } from "../../app/auth";      //functions we got from NextAuth lib
import { isRedirectError } from "next/dist/client/components/redirect";


//addUser function to add new user to the DB  .. (prevState) is for useFormState in the client component
export const addUser = async (prevState,formData) => {
  //get the user data we received from the form directly using the formData object , instead of using (req,res)
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
    return "succes"    
  } catch (err) {     
    if (isRedirectError(err)) { throw err; }        //No-redirect error fix
    return "Wrong Credentials!!";       
  }
};   


//logout function to log out the current user
export const logout = async () => {  
  await signOut();                  //log out the user using signOut() of NextAuth (auth.js file)  
  redirect("/login");               //After logout the user , redirect to login page    
};



//fetchUsers function to get all users from the DB 
export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");            //create regular expressions for received search query (case-insensitive)
  const ITEM_PER_PAGE = 2;                     //number of items for each page
  try {
    connectToDB();              //connect DB function
    //get uers count for pagination , get all users & limit data to items per page 
    const count = await User.find({ username: { $regex: regex } }).countDocuments();        
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





