"use client";

import { addProduct } from "@/lib/server_actions/product.actions";
import styles from "./productForm.module.css";
import { useFormState, useFormStatus } from "react-dom" 


const ProductForm = () => {

  //useFormState/useActionState is new react hook used to update a state value based on server action result [in this case, the state named error & the action named formAction & we pass (addProduct -> the server action , null -> state default value)] 
  const [error, formAction] = useFormState(addProduct,null); 

  return (
    <form action={formAction} className={styles.form}>       {/* addProduct server action */}
        <input type="text" placeholder="title" name="title" required />
        <select name="cat" id="cat">
          <option value="general" hidden>Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" placeholder="price" name="price" required />
        <input type="number" placeholder="stock" name="stock" required />
        <input type="text" placeholder="color" name="color" />
        <input type="text" placeholder="size" name="size" />
        <textarea required name="desc" id="desc" rows="8" placeholder="Description" ></textarea>        
        <SubmitButton />        
        {error && error}                 {/* if there's an error value in the state , render it  */}
      </form>
  )
}

export default ProductForm


//Manually created button component, separated from the form to enable using useFormStatus() hook
const SubmitButton = () => {
  const { pending } = useFormStatus();       //useFormStatus is new react hook, check if the form is submitting .. will be used with the button  
  return (
    <button type="submit" disabled={pending} > {pending ? "Submitting ..." : "Submit"} </button>
  );
}