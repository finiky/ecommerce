import { useNavigate } from "react-router-dom";
import styles from "./CartButton.module.css";
const CartButton = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const toCart = () => {
    navigate(`/cart/${user.id}`);
  };
  return (
    <button className={styles.cartButton} onClick={toCart}>
      Cart
    </button>
  );
};

export default CartButton;
