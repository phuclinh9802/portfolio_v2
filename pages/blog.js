import Link from "next/link";
import { useEffect, useState } from "react";
import Contact from "../components/contact";
// import Date from "../components/date";
import Layout from "../components/layout";
import styles from "../styles/blog.module.css";
import Navbar from "../components/navbar";

export default function Blog() {
  const [blogData, setBlogData] = useState(null);
  useEffect(() => {
    fetch("api/blog")
      .then((res) => res.json())
      .then((data) => setBlogData(data));
  }, []);
  return (
    <div>
      <Navbar />
      <ul className={styles.bloglist}>
        {blogData ? (
          <>
            {blogData.map(({ id, date, title, imgURL }) => (
              <>
                <li
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${imgURL}')`,
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
