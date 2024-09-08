import LoginForm from "@/components/login/loginForm";
import styles from "./login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default Login