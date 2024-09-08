"use client";

import { authenticate } from "@/lib/server_actions/user.actions";
import styles from "./loginForm.module.css";
import { useFormState, useFormStatus } from "react-dom"            


//Client component for the login inputs, separated from the login page route to keep the page as a server component
const LoginForm = () => {  
  
  //if we don't need to show error message we use server action directly <form action={server action}>,   
  //useFormState/useActionState is new react hook used to update a state value based on server action result [in this case, the state named error & the action named formAction & we pass (authenticate -> the server action , null -> state default value)] 
  //<form action={Server action} only send the form data. If you want to send other parameter ex.(id) you need to either set the value in a hidden input in the form or use .bind(null,parameter) is to pass the id
  const [error, formAction] = useFormState(authenticate,null)
  
  return (    
    <form action={formAction} className={styles.form} >    {/* login Api req using formAction of useFormState */}
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" required/>
      <input type="password" placeholder="password" name="password" autoComplete="new-password" required/>
      <SubmitButton />         
      <p style={{color:'red'}}>{error && error}</p>     {/* if there's an error value in the state, render it  */}
    </form>    
  );
};

export default LoginForm;   


//Manually created button component, separated from the form to enable using useFormStatus() hook
const SubmitButton = () => {
  const { pending } = useFormStatus();       //useFormStatus is new react hook, check if the form is submitting .. will be used with the button  
   return (
    <button type="submit" disabled={pending} > {pending ? "Submitting ..." : "Submit"} </button>
  );
}