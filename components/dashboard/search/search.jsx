"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";  //hook helps to limit re-renders to only when user finish inputing (like:search input)

//Client component for the Search  (placeholder prop , so we can use the component with both users & products pages)
const Search = ({ placeholder }) => {

  const searchParams = useSearchParams();          //Next hook that lets you read the current URL's query string
  const pathname = usePathname();                  //Next hook that lets you read the current URL's pathname
  const { replace } = useRouter();                 //router.replace is the same as router.push (but prevent adding the URL entry into the history)
  
  //handleSearch function to handle onChange event of the search input & get search results with its pagination
  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);     //store values as url query instead of using useState()
    params.set("page", 1);                                //store pagination query to the params (defult page=1)
    
    //store search query of the input value to the params (if only the input > 3 characters)
    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);          //go to the url with these params ex: (dashboard/users?page=1&q=omar)
  }, 300);         //after 300 ms of user stops writing the input , then the function triggers 

  return ( 
    <div className={styles.container}>
      <MdSearch />
      <input type="text" placeholder={placeholder} className={styles.input} onChange={handleSearch} />
    </div>
  );
};

export default Search;