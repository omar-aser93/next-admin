import { updateUser, fetchUser } from "@/lib/server_actions/user.actions";
import styles from "./singleUser.module.css";
import Image from "next/image";

const SingleUser = async ({ params }) => {    //get url params as props 
  
  const { id } = params;                      //get the id from the url params (the page name is [id])
  const user = await fetchUser(id);           //fetchUser server_action, pass the id then get the user data

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}> <Image src={user.img || "/noavatar.png"} alt="" fill /> </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>

        {/* updateUser server action */}
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id}/>         {/* send user id to server in hidden input */}
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder={user.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={user.isAdmin}>Yes</option>
            <option value={false} selected={!user.isAdmin}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={user.isActive}>Yes</option>
            <option value={false} selected={!user.isActive}>No</option>
          </select>
          <button>Update</button>
        </form>

      </div>
    </div>
  );
};

export default SingleUser;

