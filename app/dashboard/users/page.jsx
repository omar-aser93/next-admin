import { deleteUser, fetchUsers } from "@/lib/server_actions/user.actions";
import Pagination from "@/components/dashboard/pagination/pagination";
import Search from "@/components/dashboard/search/search";
import styles from "./users.module.css";
import Image from "next/image";
import Link from "next/link";

const Users = async ({ searchParams }) => {         //get url searchParams (queries)
  
  const q = searchParams?.q || "";                          //get search query from the url if exist
  const page = searchParams?.page || 1;                     //get page number query from the url, default is 1
  const { count, users } = await fetchUsers(q, page);       //fetchUsers server_action, pass the queries then get all users & count

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />       {/* Search component */}
        <Link href="/dashboard/users/add">  <button className={styles.addButton}>Add New</button>  </Link>
      </div>
      
      {/* users Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image src={user.img || "/noavatar.png"} alt="" width={40} height={40} className={styles.userImage} />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActive ? "active" : "passive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>  <button className={`${styles.button} ${styles.view}`}> View </button>  </Link>
                  
                  <form action={deleteUser}>         {/* deleteUser server action */}
                    <input type="hidden" name="id" value={(user.id)} />   {/* send user id to server in hidden input */}
                    <button className={`${styles.button} ${styles.delete}`}> Delete </button>
                  </form>                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />           {/* Pagination component , pass users count*/}
    </div>
  );
};


export default Users