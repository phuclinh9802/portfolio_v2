import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import { useMediaQuery } from "@mui/material";
import Date from "../../components/date";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import styles from "../../styles/blog.module.css";
import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";
import { KeyboardBackspace, PlayCircleFilled } from "@mui/icons-material";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Blogs({ data }) {
  const [img, setImg] = useState(null);
  const [checked, setChecked] = useState(true);
  const [checkedEnglish, setCheckedEnglish] = useState(true);
  const [filter, setFilter] = useState("");

  let songData = data.songList ? data.songList : null;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeEnglish = (e) => {
    setCheckedEnglish(e.target.checked);
  };

  console.log("checked: " + checked);
  console.log("checkedEnglish: " + checkedEnglish);

  console.log(data.songList);

  // const toggleFunction = () => {
  //   if (data.songList) {
  //     console.log("here");
  //     if (checked == false && checkedEnglish == true) {
  //       console.log("English");
  //       data.songList = data.songList.filter(
  //         (item) => item.category == "English"
  //       );
  //     } else if (checked == true && checkedEnglish == false) {
  //       console.log("Korean");
  //       data.songList = data.songList.filter(
  //         (item) => item.category == "Korean"
  //       );
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (data.songList) {
  //     console.log("here");
  //     if (checked == false && checkedEnglish == true) {
  //       console.log("English");
  //       data.songList = data.songList.filter(
  //         (item) => item.category == "English"
  //       );
  //     } else if (checked == true && checkedEnglish == false) {
  //       console.log("Korean");
  //       data.songList = data.songList.filter(
  //         (item) => item.category == "Korean"
  //       );
  //     }
  //   }
  // }, [data, checked, checkedEnglish]);

  const matchDownSm = useMediaQuery("(max-width:425px)");
  const matchDownMd = useMediaQuery("(max-width:768px)");
  const matchDownLg = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    if (data.id == 1) {
      fetch("/api/images")
        .then((res) => res.json())
        .then((data) => setImg(data));
    }
  }, []);
  return (
    <div>
      {data ? (
        <>
          <div className={styles.blogsection}>
            <div
              style={{
                backgroundImage: `url('${data.imgURL}')`,
              }}
              className={styles.blogheader}
            >
              <title>{data.title}</title>
            </div>
          </div>
          <article className={styles.article}>
            <h1>{data.title}</h1>
            <div className={styles.date}>
              Updated on {data.date} by {data.author}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
              className={styles.content}
            ></div>
            {data.songList ? (
              <>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />{" "}
                K-POP
                <Checkbox
                  checked={checkedEnglish}
                  onChange={handleChangeEnglish}
                  inputProps={{ "aria-label": "controlled" }}
                />{" "}
                US-UK
                <ul className={styles.songList}>
                  {((checked && checkedEnglish) ||
                    (!checked && !checkedEnglish)) && (
                    <>
                      {data.songList.map((item, i) => (
                        <li key={i} className={styles.songItem}>
                          <div className={styles.imgButton}>
                            <img
                              src={item.img}
                              alt={item.title}
                              className={styles.songImg}
                            />
                            <div className={styles.songPlayButton}>
                              <Link href={item.link}>
                                <PlayCircleFilled />
                              </Link>
                            </div>
                          </div>
                          <div className={styles.songContent}>
                            <div className={styles.songTitleSinger}>
                              <div className={styles.songTitle}>
                                {item.title}
                              </div>
                              <div className={styles.songSingers}>
                                {item.singers}
                              </div>
                            </div>
                            <div></div>
                          </div>
                        </li>
                      ))}
                    </>
                  )}

                  {!checked && checkedEnglish && (
                    <>
                      {data.songList
                        .filter((item) => item.category == "English")
                        .map((item, i) => (
                          <li key={i} className={styles.songItem}>
                            <div className={styles.imgButton}>
                              <img
                                src={item.img}
                                alt={item.title}
                                className={styles.songImg}
                              />
                              <div className={styles.songPlayButton}>
                                <Link href={item.link}>
                                  <PlayCircleFilled />
                                </Link>
                              </div>
                            </div>
                            <div className={styles.songContent}>
                              <div className={styles.songTitleSinger}>
                                <div className={styles.songTitle}>
                                  {item.title}
                                </div>
                                <div className={styles.songSingers}>
                                  {item.singers}
                                </div>
                              </div>
                              <div></div>
                            </div>
                          </li>
                        ))}
                    </>
                  )}

                  {checked && !checkedEnglish && (
                    <>
                      {data.songList
                        .filter((item) => item.category == "Korean")
                        .map((item, i) => (
                          <li key={i} className={styles.songItem}>
                            <div className={styles.imgButton}>
                              <img
                                src={item.img}
                                alt={item.title}
                                className={styles.songImg}
                              />
                              <div className={styles.songPlayButton}>
                                <Link href={item.link}>
                                  <PlayCircleFilled />
                                </Link>
                              </div>
                            </div>
                            <div className={styles.songContent}>
                              <div className={styles.songTitleSinger}>
                                <div className={styles.songTitle}>
                                  {item.title}
                                </div>
                                <div className={styles.songSingers}>
                                  {item.singers}
                                </div>
                              </div>
                              <div></div>
                            </div>
                          </li>
                        ))}
                    </>
                  )}
                </ul>
              </>
            ) : null}

            <p>
              Follow me on{" "}
              <Link href="https://www.instagram.com/philnguyen2901/">
                <span className={styles.instagramImg}>
                  <img
                    width="30"
                    height="30"
                    src="/images/social/instagram.png"
                    style={{ textAlign: "end" }}
                  />
                </span>
              </Link>
            </p>
          </article>
          <div className={styles.imglist}>
            {img ? (
              <ImageList
                sx={{
                  width: matchDownSm
                    ? 330
                    : matchDownMd
                    ? 600
                    : matchDownLg
                    ? 800
                    : 1000,
                  height: 600,
                }}
                variant="quilted"
                cols={matchDownMd ? 2 : matchDownLg ? 3 : 4}
                rowHeight={300}
              >
                {img.map((item) => (
                  <ImageListItem key={item.url} cols={1} rows={1}>
                    <img
                      {...srcset(item.url, 121, 1, 1)}
                      alt={item.img}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : null}
          </div>
        </>
      ) : null}
      <div className={styles.backbutton}>
        <Link href="/blog">
          <KeyboardBackspace style={{ paddingTop: "5px" }} /> Back to Blogs
        </Link>
      </div>
    </div>
  );
}

export const getStaticPaths = () => {
  // Specifying all the routes to be
  // pre-rendered by next js
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false,
  };
};
export async function getStaticProps({ params }) {
  const postData = [
    {
      id: 1,
      title: "First time in Seattle",
      date: "1/18/2023",
      author: "Phillip Nguyen",
      imgURL: "https://i.imgur.com/cs41hM3.jpg",
      content:
        "<p>This is my first blog ever! I am glad I finally decided to create one, due to my laziness, lol. Anyway, I and Nguyet, my girlfriend, just had a blast in one of the most beautiful and intelligent cities in the United States, Seattle, Washington. There is a myriad of attraction such as Space Needle, Museum of Pop Culture (MoPOP), Chihuly Garden and Glass (a must-see IMO), Pike Place Market, Seattle Great Wheel, and so on. Especially, Pike Place Market is famous in Seattle because it's one of the oldest continually running markets in the country, according to travelleming.com. Here, we tried the clam chowder, which is awarded the best clam chowder in the nation. A fun experience in this attraction indeed, not only was because of the food, but also was the people and the environment they brought to the visitors. I remembered when we are offered to try samples of three types of cooked salmon and were amazed at how unique and delicious they were. “Have you ever tried Salmon Candy?”, asked the fisherman. We were confused: “Wait, Salmon Candy? What do you mean? Do they taste sweet?”. Indeed, they were meaty but sweet at the same time, thus our new favorite dessert was introduced. You must try it once when coming to the market. </p><p>We also visited the Space Needle, one of the most famous attractions of the country, if not of the world. Because we travelled either when people were working, or when COVID-19 still spread, not many people were there with us. Therefore, Nguyet and I could enjoy fully the experience of capturing the sunny day (which was rare) in Seattle City from the observatory deck (Like the image above). There are so many pictures we took from the deck that I will create a gallery right here so people can see how beautiful the scene looks like when Seattle weather is nice and peaceful. </p><p>Speaking about Seattle, we could not miss the first Starbucks ever, Starbucks Reserve Roastery, located in 1124 Pike St, Seattle, WA 98101. From the first look outside, the store seemed to be more modern than I imagined. However, the coffee makers, and the roasting process were displayed like it was in the past. We got ourselves our favorite drinks: Peppermint Oatmilk Mocha and Hazelnut Bianco Latte. </p><p>We visited many more attractions, and like I said, I have created a gallery for you to follow and see what they looked like. Oh, and I guess this is the most important thing to consider when traveling to Seattle: You do not even need to rent a vehicle, since Seattle contains tons of public transportation, such as Link Light Rail, Metro Public Bus, Monorail, etc. The transportation is also cheap if you are not planning to stay here long, which only ranges around $3-$8 per trip based on your need. </p><p>Finally, for the budget, we spent the total of around $1000, including round-trip plane tickets, AirBnB, CityPass (you might want to visit this before considering to visit Seattle), and miscellaneous things (food, traveling place to place, shopping,…). </p><p>In conclusion, writing this for the first time was really fun, since I could feel reminiscent about how fun we spent our time in Seattle and ingrain in my memory. I will try to write more of this in the future! Please stay tuned. </p>",
      songList: null,
    },
    {
      id: 2,
      title: "My Favorite Songs for 2023",
      date: "1/19/2023",
      author: "Phillip Nguyen",
      imgURL: "/images/spotify.png",
      content:
        "These are my favorite songs between 2022-2023, hopefully we have the same taste of music :) Click on any of the songs below to listen with me on Spotify <3",
      songList: [
        {
          title: "When I Get Old",
          singers: "Christopher, CHUNG HA",
          img: "/images/songs/whenigetold.png",
          link: "https://open.spotify.com/track/5f2CcxzZoW7hNs1O8NhG6y?si=476de78a032c48c1",
          category: "KPOP",
        },
        {
          title: "Dear My Winter",
          singers: "george, Chuu",
          img: "/images/songs/dearmywinter.png",
          link: "https://open.spotify.com/track/7sqtyHfTHtkLtnxuQ3ttvo?si=db6a92f97dd644d1",
          category: "Korean",
        },
        {
          title: "Lovey Dovey",
          singers: "BIG Naughty, meenoi",
          img: "/images/songs/loveydovey.png",
          link: "https://open.spotify.com/track/1s3AJx7XASsPSA2cKJdXG6?si=2c1a58e5903043df",
          category: "Korean",
        },
        {
          title: "Love Song",
          singers: "Wonstein, JOY",
          img: "/images/songs/lovesong.png",
          link: "https://open.spotify.com/track/7JF6USn1d7oBnjITCKtSHp?si=0555b38487324495",
          category: "Korean",
        },
        {
          title: "I Wanna Be - The 1st Album Repackage",
          singers: "KEY, JEON SOYEON",
          img: "/images/songs/iwannabe.png",
          link: "https://open.spotify.com/track/7Bd6h5KwA4ASCXCSoWIS3i?si=9bcf0224f87a4e70",
          category: "Korean",
        },
        {
          title: "I Like Me Better",
          singers: "Lauv",
          img: "/images/songs/ilikemebetter.png",
          link: "https://open.spotify.com/track/0EcQcdcbQeVJn9fknj44Be",
          category: "English",
        },
        {
          title: "Stay",
          singers: "The Kid LAROI, Justin Bieber",
          img: "/images/songs/stay.png",
          link: "https://open.spotify.com/track/5HCyWlXZPP0y6Gqq8TgA20?si=ddde4a85cf3045be",
          category: "English",
        },
        {
          title: "In the Name of Love",
          singers: "Martin Garrix",
          img: "/images/songs/inthenameoflove.png",
          link: "https://open.spotify.com/track/23L5CiUhw2jV1OIMwthR3S?si=16e454ecf7fe4357",
          category: "English",
        },
        {
          title: "Let Me Love You",
          singers: "DJ Snake, Justin Bieber",
          img: "/images/songs/letmeloveyou.png",
          link: "https://open.spotify.com/track/0lYBSQXN6rCTvUZvg9S0lU?si=b7479e32c785404f",
          category: "English",
        },
        {
          title: "Way U Are",
          singers: "Jiselle, BIG Naughty",
          img: "/images/songs/wayuare.png",
          link: "https://open.spotify.com/track/1cHwmkEYWHstlT9hRF0EeP?si=212ea56e2b644d52",
          category: "Korean",
        },
      ],
    },
  ];

  const data = postData[params.id - 1];
  return {
    props: {
      data,
    },
  };
}
