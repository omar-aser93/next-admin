import NextAuth from "next-auth";
import { authConfig } from './app/authconfig'            //Auth Routing function


export default NextAuth(authConfig).auth;                     //set authConfig function as middleware for all requests

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],             //important for external imgs & links to work
};