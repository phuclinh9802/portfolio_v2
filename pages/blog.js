import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/blog.module.css";
import Navbar from "../components/navbar";
import Head from "next/head";
import { Chip, Skeleton, Typography } from "@mui/material";

export default function Blog() {
  const [blogData, setBlogData] = useState(null);
  const [toggleTab, setToggleTab] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    fetch("api/blog")
      .then((res) => res.json())
      .then((data) => setBlogData(data));
  }, []);

  useEffect(() => {
    if (blogData) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 2000);
    }
  }, [blogData]);
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
            style={{ zIndex: 1 }}
            onClick={() => setToggleTab(true)}
            label={"#general"}
          ></Chip>
          <Chip
            style={{ zIndex: 1 }}
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
                          {isLoaded ? (
                            <li
                              style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${imgURL}')`,
                                backgroundPosition: `${bgPos}`,
                                // paddingTop: "140px",
                              }}
                              className={styles.blogitem}
                              key={id}
                            >
                              <div className={styles.blogchip}>
                                <Chip
                                  style={{ backgroundColor: "#ffcc00" }}
                                  label={`#${type}`}
                                />
                              </div>
                              <div className={styles.blogitemtitle}>
                                <Link href={`/blog/${id}`}>
                                  <Typography
                                    variant="h6"
                                    className={styles.linkblog}
                                  >
                                    {title}
                                  </Typography>
                                  <br />
                                  <Typography
                                    variant="subtitle2"
                                    className={styles.linkdate}
                                  >
                                    {date}
                                  </Typography>
                                </Link>
                              </div>
                            </li>
                          ) : (
                            <Skeleton
                              variant="rectangular"
                              width={400}
                              height={300}
                            />
                          )}
                        </>
                      ))}
                    </>
                  )}
                  {toggleTab == false && type == "interview" && (
                    <>
                      {blogs.map(
                        ({ id, date, title, imgURL, bgPos, dtType }) => (
                          <>
                            {isLoaded ? (
                              <li
                                style={{
                                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${imgURL}')`,
                                  backgroundPosition: `${bgPos}`,
                                }}
                                className={styles.blogitem}
                                key={id}
                              >
                                <div className={styles.blogchip}>
                                  <Chip
                                    style={{ backgroundColor: "#00b3ff" }}
                                    label={`#${type}`}
                                  />
                                </div>
                                <div className={styles.blogitemtitle}>
                                  <Link href={`/blog/${id}`}>
                                    {dtType?.map((item) => (
                                      <>
                                        <Chip
                                          style={{
                                            backgroundColor: "#ff6832",
                                            color: "#fff",
                                          }}
                                          label={`#${dtType ? item : null}`}
                                          size="small"
                                        />
                                      </>
                                    ))}
                                    <div className={styles.linkblog}>
                                      {title}
                                    </div>
                                    <br />
                                    <small className={styles.linkdate}>
                                      {date}
                                    </small>
                                  </Link>
                                </div>
                              </li>
                            ) : (
                              <Skeleton
                                variant="rectangular"
                                width={400}
                                height={300}
                              />
                            )}
                          </>
                        )
                      )}
                    </>
                  )}
                </>
              ))}
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
