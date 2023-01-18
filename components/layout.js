// experience will be the children prop, since it will have 2 tabs - exp & projects

import About from "./about";
import Hero from "./hero";
import Navbar from "./navbar";
import Contact from "./contact";

import styles from "../styles/layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <div className="nb">
        <Navbar />
      </div>
      <div className="content">
        <div id="hero">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <main id="experience">{children}</main>
      </div>
      <div className={styles.footer}>
        <div id="contact">
          <Contact />
        </div>
      </div>
    </div>
  );
}
