import Image from "next/image";
import styles from "@styles/hero.module.css";
import "../styles/utils.css";

export default function Header() {
  return (
    <>
      <div className={`${styles.hero}`}>
        <div className={`${styles.hero__container}`}>
          <div className={`${styles.hero__promotion}`}>
            <h1>🚀 Empowering Startups, Connecting Investors</h1>
            <p className={`${styles.hero__description}`}>
              Invest Vault is the bridge between visionary startups and smart
              investors. Whether you're a founder seeking funding or an investor
              looking for the next big opportunity, we provide a seamless
              platform to match your goals. 💡 Discover startups. 🔍 Find
              investors. 💰 Grow together.
            </p>
          </div>

          <div className={`${styles.image}`}>
            <Image
              src="/dollor.png" // Replace with your actual image name
              alt="Invest Vault Hero"
              width={600} // Adjust width
              height={600} // Adjust height
              priority // Loads image immediately
            />
          </div>
        </div>
      </div>
    </>
  );
}
