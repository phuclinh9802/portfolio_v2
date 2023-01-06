// experience will be the children prop, since it will have 2 tabs - exp & projects

import About from "./about";
import Hero from "./hero";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <main id="experience">{children}</main>
      {/* <Contact /> */}
    </div>
  );
}
