import { updateProduct, fetchProduct } from "@/lib/server_actions/product.actions";
import styles from "./singleProduct.module.css";
import Image from "next/image";

const SingleProduct = async ({ params }) => {     //get url params as props 

  const { id } = params;                      //get the id from the url params (the page name is [id])
  const product = await fetchProduct(id);     //fetchProduct server_action, pass the id then get the product data

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}> <Image src={product.img || "/noproduct.jpg"} alt="" fill /> </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>

        {/* updateProduct server action */}
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={product.id} />       {/* send product id to server in hidden input */}
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={product.price} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={product.stock} />
          <label>Color</label>
          <input type="text" name="color" placeholder={product.color || "color"} />
          <label>Size</label>
          <textarea type="text" name="size" placeholder={product.size || "size"}  />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea name="desc" id="desc" rows="10" placeholder={product.desc} ></textarea>
          <button>Update</button>
        </form>

      </div>
    </div>
  );
};

export default SingleProduct;