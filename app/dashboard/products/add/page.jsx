import { addProduct } from "@/app/lib/actionControllers";
import styles from "./addProduct.module.css";

const AddProduct = () => {
  return (
    <div className={styles.container}>

      <form action={addProduct} className={styles.form}>       {/* addProduct API req using server actions */}
        <input type="text" placeholder="title" name="title" required />
        <select name="cat" id="cat">
          <option value="general">Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" placeholder="price" name="price" required />
        <input type="number" placeholder="stock" name="stock" required />
        <input type="text" placeholder="color" name="color" />
        <input type="text" placeholder="size" name="size" />
        <textarea required name="desc" id="desc" rows="8" placeholder="Description" ></textarea>
        <button type="submit">Submit</button>
      </form>

    </div>
  );
};

export default AddProduct;