//Function for Auth & routes , check docs : https://nextjs.org/learn/dashboard-app/adding-authentication
export const authConfig = {
    providers:[],
    pages: {
      signIn: "/login",            //login page folder name, so we can redirect to & from it (as default)
    },
    callbacks: {
      authorized({ auth, request }) {             
        //check if we're on a dashboard routes  
        if (request.nextUrl.pathname.startsWith("/dashboard")) {        
          //if user is logged in, go to the dashboard , else stay on login page        
          if (auth?.user) return true;
          return false; 
        //if else we're on other route (/login) & user is logged in, then redirect to dashboard    
        } else if (auth?.user) {          
          return Response.redirect(new URL("/dashboard", request.nextUrl));
        }
        return true;      //default (not on dshboard route & not loogged in) , stay on the current route ex:(/login)
      },
    },
  };