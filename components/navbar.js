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
