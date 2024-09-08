"use client";

import { addUser } from "@/lib/server_actions/user.actions";
import styles from "./userForm.module.css";
import { useFormState, useFormStatus } from "react-dom" 


const UserForm = () => {

  //useFormState/useActionState is new react hook used to update a state value based on server action result [in this case, the state named error & the action named formAction & we pass (addUser -> the server action , null -> state default value)] 
  const [error, formAction] = useFormState(addUser,null);  
  
  return (
    <form action={formAction} className={styles.form}>         {/* addUser server action */}
        <input type="text" placeholder="username" name="username" required />
        <input type="email" placeholder="email" name="email" required />
        <input type="password" placeholder="password" name="password" required />
        <input type="phone" placeholder="phone" name="phone" />
        <select name="isAdmin" id="isAdmin">
          <option value={false} disabled> Is Admin? </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={true}> Is Active? </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <textarea name="address" id="address" rows="6" placeholder="Address" ></textarea>
        <SubmitButton />        
        {error && error}                 {/* if there's an error value in the state , render it  */}
    </form>      
  )
}

export default UserForm


//Manually created button component, separated from the form to enable using useFormStatus() hook
const SubmitButton = () => {
  const { pending } = useFormStatus();       //useFormStatus is new react hook, check if the form is submitting .. will be used with the button  
  return (
    <button type="submit" disabled={pending} > {pending ? "Submitting ..." : "Submit"} </button>
  );
}