import { useNavigate } from "react-router-dom";
import styles from "./LogInButton.module.css";
const LogInButton = () => {
  const navigate = useNavigate();
  const toLoginPage = () => {
    navigate("/loginpage");
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  if (localStorage.getItem("x-auth-token")) {
    return (
      <div>
        <button onClick={logOut} className={styles.logIn}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={toLoginPage} className={styles.logIn}>
        Log In
      </button>
    </div>
  );
};

export default LogInButton;
