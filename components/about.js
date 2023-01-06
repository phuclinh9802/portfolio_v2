import styles from "../styles/about.module.css";

export default function About() {
  return (
    <div className={styles.aboutpage}>
      <div className={styles.quotesection}>
        <p className={styles.quote}>
          “If you want better results, then forget about setting goals. Focus on
          your system instead.”
        </p>
        <p className={styles.author}>James Clear</p>
      </div>
      <div className={styles.aboutsection}>
        <p className={styles.header}>Who I Am</p>
        <p className={styles.description}>
          My name is Phuc Nguyen, I am currently a graduate student from UNO,
          majoring in MIS. While there, I learned a lot of theory in subjects
          like prototyping, agile, or database design. However, most of the
          software development knowledge were self-taught or introduced during
          my undergraduate years and internships, such as data structures and
          algorithms, front-end/back-end development. I have exposure to React
          Node, Python as well, and SQL technologies such as MySQL, PostgreSQL.
          Now, I’m looking to leverage everything I’ve learned in the past and
          get some more hands-on work experience to hopefully reach my career
          goal as a full-time software developer.
        </p>
      </div>
    </div>
  );
}
