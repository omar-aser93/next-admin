"use client";

import { authenticate } from "@/app/lib/actionControllers";
import styles from "./loginForm.module.css";
//useFormState is a react Hook to update state based on the result of a form action (submit)
import { useFormState } from "react-dom";


//Client component for the login inputs , separate from the login page to keep it as a server component
const LoginForm = () => {  
  
  /* if we don't need error message we use server action directly <form action={server action}>, 
  but for err message we use useFormState hook & pass (the server action , error state default value)  */
  const [state, formAction] = useFormState(authenticate, undefined);    

  return (
    <form action={formAction} className={styles.form}>    {/* login Api req using formAction of useFormState */}
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state && state}                 {/* if there's an error value in the state , render it  */}
    </form>
  );
};

export default LoginForm;   