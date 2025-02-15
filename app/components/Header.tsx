import Link from "next/link";
import styles from "@styles/header.module.css";
import "../styles/utils.css";

export default function Header() {
  return (
    <>
      <header className={`${styles.container} ${styles.header}`}>
        <div className={styles.logo}>Invest-Vault</div>

        <div className={styles.header__menu}>
          <div className={styles.header__items}>Home</div>
          <div className={styles.header__items}>About</div>
          <button className={`${styles.header__items} ${styles.btn}`}>
            Login
          </button>
          <button className={`${styles.header__items} ${styles.btn}`}>
            Signup
          </button>
        </div>
      </header>
    </>
  );
}
