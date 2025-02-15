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

          {/* Login Button with Link */}
          <Link href="/login" passHref>
            <button className={`${styles.header__items} ${styles.btn}`}>
              Login
            </button>
          </Link>

          {/* Signup Button with Link */}
          <Link href="/signup" passHref>
            <button className={`${styles.header__items} ${styles.btn}`}>
              Signup
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
