"use client";

import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//Client component for the Pagination of (users, products) data grids 
const Pagination = ({ count }) => {         //recieved users count prop, to help determine num of next pages  

  const searchParams = useSearchParams();          //Next hook that lets you read the current URL's query string
  const pathname = usePathname();                  //Next hook that lets you read the current URL's pathname
  const { replace } = useRouter();                 //router.replace is the same as router.push (but prevent adding the URL entry into the history)

  const page = searchParams.get("page") || 1;         //get page number query from the url, default is 1
  const params = new URLSearchParams(searchParams);   //store values as url query instead of using useState()
  const ITEM_PER_PAGE = 2;                            //number of items for each page

  //will be used to disable the previous/next buttons when there's no previous/next page
  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;                          
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

  //handleChangePage function to handle onClick event of (Previous , Next) buttons by decrease or increase page value
  const handleChangePage = (type) => {
    type === "prev" ? params.set("page", parseInt(page) - 1) : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);                //go to the url with these params ex: (dashboard/users?page=1)    
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={!hasPrev} onClick={() => handleChangePage("prev")} >
        Previous
      </button>
      <button className={styles.button} disabled={!hasNext} onClick={() => handleChangePage("next")} >
        Next
      </button>
    </div>
  );
};

export default Pagination;