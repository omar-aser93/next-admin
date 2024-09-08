import NextAuth from "next-auth";
import { authConfig } from '@/app/authconfig'            //Auth function we created


export default NextAuth(authConfig).auth;          //initializing NextAuth middleware with the authConfig object 

//matcher allows you to filter Middleware to run on specific paths, https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],             
};