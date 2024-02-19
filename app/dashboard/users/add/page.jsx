"use client";

import { addUser } from "@/app/lib/actionControllers";
import styles from "./addUser.module.css";
//useFormState is a react Hook to update state based on the result of a form action (submit)
import { useFormState } from "react-dom";

const AddUser = () => {

    /* if we don't need error message we use server action directly <form action={server action}>, 
  but for err message we use useFormState hook & pass (the server action , error state default value)  */
  const [state, formAction] = useFormState(addUser, undefined);  

  return (
    <div className={styles.container}>

      <form action={formAction} className={styles.form}>          {/* addUser API req using server actions */}
        <input type="text" placeholder="username" name="username" required />
        <input type="email" placeholder="email" name="email" required />
        <input type="password" placeholder="password" name="password" required />
        <input type="phone" placeholder="phone" name="phone" />
        <select name="isAdmin" id="isAdmin">
          <option value={false}> Is Admin? </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={true}> Is Active? </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <textarea name="address" id="address" rows="6" placeholder="Address" ></textarea>
        <button type="submit">Submit</button>
      </form>
      <br /><br />
    {state && state}                 {/* if there's an error value in the state , render it  */}
    </div>
  );
};

export default AddUser;

