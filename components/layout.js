// experience will be the children prop, since it will have 2 tabs - exp & projects

import About from "./about";
import Hero from "./hero";
import Navbar from "./navbar";
import Contact from "./contact";

import styles from "../styles/layout.module.css";
import { Alert, Snackbar, Button } from "@mui/material";
import { forwardRef, useState } from "react";
import { Celebration } from "@mui/icons-material";

// const Alert = forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className={styles.layout}>
      {/* <Alert variant="filled" severity="info" style={{ textAlign: "center" }}>
        Happy Lunar New Year 2023!! Hope you all have a good day!{" "}
        <Celebration style={{ color: "orange", paddingTop: "4px" }} />
        <Celebration style={{ color: "orange", paddingTop: "4px" }} />
        <Celebration style={{ color: "orange", paddingTop: "4px" }} />
      </Alert> */}

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
