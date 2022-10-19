import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HomeButton from "./components/HomeButton";
import LogInButton from "./components/LogInButton";
import LoginPage from "./components/LoginPage";
import CartButton from "./components/CartButton";
import CartPage from "./components/CartPage";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.shopName}>E-Stationery</h1>
        <HomeButton />
        <LogInButton />
        <CartButton />
      </header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/loginpage" element={<LoginPage />} />
        <Route exact path="/cart/:id" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
