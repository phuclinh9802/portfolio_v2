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
        <div className={styles.hamburgerlines}>
          <span className={styles.line1}></span>
          <span className={styles.line2}></span>
          <span className={styles.line3}></span>
        </div>
        <ul>
          <li>
            <Link href="/#about">About</Link>
          </li>
          <li>
            <Link href="/#experience">Experience</Link>
          </li>
          <li>
            <Link href="https://drive.google.com/file/d/1hjn00LFXi1UIY-T6fhzBW5eOcFARwSjg/view?usp=sharing">
              Resume
            </Link>
          </li>
          <li>
            <Link href="/#contact">Contact</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
