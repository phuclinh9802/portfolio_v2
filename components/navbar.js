import Image from "next/image";
import Link from "next/link";
import styles from "../styles/layout.module.css";
import signature from "../public/images/signature.png";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.brand}>
        <Link href="/">
          <Image src="/images/signature.png" width={250} height={100} />
        </Link>
      </div>
      <div className={styles.navsection}>
        <input type="checkbox" name="" id=""></input>
        <div class={styles.hamburgerlines}>
          <span class={styles.line1}></span>
          <span class={styles.line2}></span>
          <span class={styles.line3}></span>
        </div>
        <ul>
          <li>
            <Link href="#about">About</Link>
          </li>
          <li>
            <Link href="#experience">Experience</Link>
          </li>
          <li>
            <Link href="#contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
