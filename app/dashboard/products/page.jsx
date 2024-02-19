import Image from "next/image";
import Link from "next/link";
import styles from "./products.module.css";
import Search from "@/app/components/dashboard/search/search";
import Pagination from "@/app/components/dashboard/pagination/pagination";
import { fetchProducts } from "@/app/lib/getControllers";
import { deleteProduct } from "@/app/lib/actionControllers";

const Products = async ({ searchParams }) => {      //searchParams is input queries from search & pagination components

  const q = searchParams?.q || "";                               //get search query from the url if exist
  const page = searchParams?.page || 1;                          //get page number query from the url, default is 1
  const { count, products } = await fetchProducts(q, page);      //Api fetch req , pass the queries then get products & count

  return (
    <div className={styles.container}>
      <div className={styles.top}> 
        <Search placeholder="Search for a product..." />                {/* Search component */}
        <Link href="/dashboard/products/add">  <button className={styles.addButton}>Add New</button>  </Link>
      </div>

      {/* products Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product}>
                  <Image src={product.img || "/noproduct.jpg"} alt="" width={40} height={40} className={styles.productImage} />
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>${product.price}</td>
              <td>{product.createdAt?.toString().slice(4, 16)}</td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product.id}`}> <button className={`${styles.button} ${styles.view}`}> View </button>  </Link>

                  <form action={deleteProduct}>           {/* deleteProduct Api req using server actions */}
                    <input type="hidden" name="id" value={product.id} />    {/* send product id to server in hidden input */}
                    <button className={`${styles.button} ${styles.delete}`}> Delete </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />                  {/* Pagination component , pass products count*/}
    </div>
  );
};

export default Products;

