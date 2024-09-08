//Function for Auth & routes , check docs : https://nextjs.org/learn/dashboard-app/adding-authentication
export const authConfig = {
    providers:[],
    pages: {
      signIn: "/login",            //login page route name, so we can redirect to & from it 
    },
    callbacks: {
      authorized({ auth, request }) {             
        //check if the user is on one of dashboard routes  
        if (request.nextUrl.pathname.startsWith("/dashboard")) {        
          //if user is logged in, go to a dashboard page .. else, Redirect unauthenticated users to login page       
          return (auth?.user) ? true : false            
        //if else we're on other routes & user is logged in, then redirect to the route   
        } else if (auth?.user) {          
          return Response.redirect(new URL("/dashboard", request.nextUrl));
        }
        return true;      //default (not on dshboard route & not loogged in), stay on the current route ex:(/login) 
      },
    },
  };