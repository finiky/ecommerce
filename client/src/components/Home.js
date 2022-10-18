import React from "react";
import { useState, useEffect } from "react";
import AddToCart from "./AddToCartButton";
import styles from "./Home.module.css";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const productsURL = "http://localhost:4000/items";
      const result = await fetch(productsURL);
      let data = await result.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <ul className={styles.products}>
      {products.map(({ title, description, price, id }) => {
        return (
          <li key={id}>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
              <p>{price}</p>
            </div>
            <AddToCart id={id} />
          </li>
        );
      })}
    </ul>
  );
};

export default Home;
