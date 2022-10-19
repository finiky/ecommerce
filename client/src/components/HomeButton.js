import { useNavigate } from "react-router-dom";
import styles from "./HomeButton.module.css";
const HomeButton = () => {
  const toHome = () => {
    navigate("/");
  };
  const navigate = useNavigate();
  return (
    <button className={styles.homeButton} onClick={toHome}>
      Home
    </button>
  );
};

export default HomeButton;
