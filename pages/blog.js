import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/blog.module.css";
import Navbar from "../components/navbar";
import Head from "next/head";
import { Chip } from "@mui/material";

export default function Blog() {
  const [blogData, setBlogData] = useState(null);
  const [toggleTab, setToggleTab] = useState(true);
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
      <div>
        <Navbar />
      </div>

      <div className={styles.blogsection}>
        <div className={styles.hashtaglist}>
          <Chip
            style={{ pointerEvents: "all" }}
            onClick={() => setToggleTab(true)}
            label={"#general"}
          ></Chip>
          <Chip
            onClick={() => setToggleTab(false)}
            label={"#interviewprep"}
          ></Chip>
        </div>
        <ul className={styles.bloglist}>
          {blogData ? (
            <>
              {blogData.map(({ type, blogs }) => (
                <>
                  {toggleTab == true && type == "general" && (
                    <>
                      {blogs.map(({ id, date, title, imgURL, bgPos }) => (
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
                  )}
                  {toggleTab == false && type == "interview" && (
                    <>
                      {blogs.map(({ id, date, title, imgURL, bgPos }) => (
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
                  )}
                </>
              ))}
              {/* {blogData.map(({ id, date, title, imgURL, bgPos }) => (
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
            ))} */}
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

/**
 *  tab -> press #interview -> toggle = false => when type = general => display blogs attribute with type general
 *
 *
 */
