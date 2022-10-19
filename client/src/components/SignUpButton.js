import styles from "./SignUpButton.module.css";
const SignUpButton = () => {
  const toSignUp = () => {};
  return <button className={styles.signUpButton} onclick={toSignUp}>Sign Up</button>;
};
export default SignUpButton;