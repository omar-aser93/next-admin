//we're using (name,pass) here , for other Providers check docs , https://next-auth.js.org/providers/credentials
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "@/lib/DB-connection";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";


//function to verify the user at login , we will pass it to NextAuth function
const login = async (credentials) => {
  try {
    connectToDB();               //connect DB function
    const user = await User.findOne({ username: credentials.username });   //find the user by the name we recieved
    if (!user || !user.isAdmin) throw new Error("Wrong credentials!");     //user not exist or not admin => error
    //un-hash the password & compare with the recieved password
    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password); 
    if (!isPasswordCorrect) throw new Error("Wrong credentials!");        //if passwords not matched => error 
 
    return user;                //Default : if everything is correct return the user
  } catch (err) {
    console.log(err);          //log the errors
    throw new Error("Failed to login!");
  }
};


//Get {signIn, signOut, auth(gets user_data)} NextAuth functions .. it'll be used at the controllers/actions 
export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);                   
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION (JWT)
  callbacks: {
    async jwt({ token, user }) {                 //create the token & pass user data to it
      if (user) {
        token.username = user.username;
        token.img = user.img;
      }     
      return token;      
    },
    async session({ session, token }) {          //pass the token to the session , so it'll be stored when refresh
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
      }          
      return session;
    },
  },
});

