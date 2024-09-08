import styles from "./addProduct.module.css";
import ProductForm from "@/components/dashboard/productForm/productForm"

const AddProduct = () => {  
  return (
    <div className={styles.container}>
       <ProductForm />
    </div>
  );
};

export default AddProduct;