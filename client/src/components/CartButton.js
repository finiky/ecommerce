import { useNavigate } from "react-router-dom";
import styles from "./CartButton.module.css";
const CartButton = () => {
  const navigate = useNavigate();
  const toCart = () => {
    navigate("/cart");
  };
  return (
    <button className={styles.cartButton} onClick={toCart}>
      Cart
    </button>
  );
};

export default CartButton;
