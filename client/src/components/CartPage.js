import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const fetchURL = `http://localhost:4000/cart/${id}`;
      const response = await fetch(fetchURL);
      if (response.ok) {
        const { items, bill, _id } = await response.json();
        setCart({ items, bill, _id });
        setNotFound(false);
        setLoading(false);
      } else {
        setNotFound(true);
        setLoading(false);
      }
    };
    getData();
  }, [id]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (notFound) {
    return (
      <div>
        <p>Cart is empty</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {cart.items.map(({ price, quantity, _id, name }) => {
          return (
            <li key={_id}>
              <p>Product Name: {name}</p>
              <p>Order Quantity: {quantity}</p>
              <p>Price per Unit: {price}</p>
            </li>
          );
        })}
      </ul>
      <p>Bill: {cart.bill}</p>
    </div>
  );
};

export default CartPage;
