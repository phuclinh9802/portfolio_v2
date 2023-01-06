import Image from "next/image";
import styles from "../styles/layout.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.herotext}>
        <h1 className={styles.heroname}>Phuc Nguyen</h1>
        <h3 className={styles.title}>// Software Developer</h3>
        <h3 className={styles.title}>// M.I.S Graduate Student</h3>
      </div>
      <div className={styles.heroimages}>
        <div className={styles.myimage}>
          <Image src="/images/me.png" width={450} height={700} alt="me" />
        </div>
        <div className={styles.sunsetimage}>
          <Image
            src="/images/IMG_5986.png"
            width={300}
            height={250}
            alt="Sunset"
          />
          <div className={styles.adjectives}>
            <span className={styles.orangetext}>Passionate</span>
            <span>Diligent</span>
            <span>Photography</span>
            <span className={styles.orangetext}>Introvert</span>
            <span className={styles.orangetext}>Musicophile</span>{" "}
            <span>Resilient</span>
          </div>
        </div>
      </div>
    </div>
  );
}
