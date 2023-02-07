import Link from "next/link";
import { useEffect, useState } from "react";
import Contact from "../components/contact";
// import Date from "../components/date";
import Layout from "../components/layout";
import styles from "../styles/blog.module.css";
import Navbar from "../components/navbar";
import { Alert } from "@mui/material";
import { Celebration, EmojiEmotions } from "@mui/icons-material";
import Head from "next/head";

export default function Blog() {
  const [blogData, setBlogData] = useState(null);
  useEffect(() => {
    fetch("api/blog")
      .then((res) => res.json())
      .then((data) => setBlogData(data));
  }, []);
  return (
    <div>
      <Head>
        <title>Phuc{"'"}s Blog Posts</title>
      </Head>
      {/* <Alert
        icon={<EmojiEmotions />}
        variant="filled"
        severity="info"
        style={{ textAlign: "center" }}
      >
        Happy Lunar New Year 2023!! Hope you all have a good day!{" "}
        <Celebration style={{ color: "orange", paddingTop: "2px" }} />
        <Celebration style={{ color: "orange", paddingTop: "2px" }} />
        <Celebration style={{ color: "orange", paddingTop: "2px" }} />
      </Alert> */}
      <Navbar />

      <ul className={styles.bloglist}>
        {blogData ? (
          <>
            {blogData.map(({ id, date, title, imgURL, bgPos }) => (
              <>
                <li
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${imgURL}')`,
                    backgroundPosition: `${bgPos}`,
                  }}
                  className={styles.blogitem}
                  key={id}
                >
                  <Link href={`/blog/${id}`}>
                    <div className={styles.linkblog}>{title}</div>
                    <br />
                    <small className={styles.linkdate}>{date}</small>
                  </Link>
                </li>
              </>
            ))}
          </>
        ) : null}
      </ul>
    </div>
  );
}
