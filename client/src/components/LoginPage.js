import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const user = await response.json();
    if (!user.token) {
      alert("Invalid Login Details");
      navigate("/loginpage");
    } else {
      localStorage.setItem("x-auth-token", JSON.stringify(user.token));
      localStorage.setItem("user", JSON.stringify(user.user));
      navigate("/");
    }
  };
  return (
    <div>
      <form className={styles.logInForm} method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <p className={styles.inputs}>Email</p>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <p className={styles.inputs}>Password</p>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
