import styles from "./addUser.module.css";
import UserForm from "@/components/dashboard/userForm/userForm"         

const AddUser = () => {
  return (
    <div className={styles.container}>
       <UserForm />
    </div>
  );
};

export default AddUser;

