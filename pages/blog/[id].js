import Head from "next/head";
import { Suspense, useEffect, useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import { Box, useMediaQuery } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { DiscussionEmbed } from "disqus-react";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {
  DarkMode,
  KeyboardBackspace,
  LightMode,
  PlayCircleFilled,
} from "@mui/icons-material";
import Tab from "@mui/material/Tab";

import Earth from "../../components/earth";
import Overlay from "../../components/overlay";
import styles from "../../styles/blog.module.css";

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
  const [checkedVietnamese, setCheckedVietnamese] = useState(true);
  const [isAlbum, setIsAlbum] = useState("1");
  const [colorMode, setColorMode] = useState("light");

  const shortName = "portfolio";

  const disqusConfig = {
    url: process.env.NEXT_PUBLIC_PROD_URL,
    identifier: data.title,
    title: data.title,
    language: "en",
    ssr: "false",
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeEnglish = (e) => {
    setCheckedEnglish(e.target.checked);
  };

  const handleChangeVietnamese = (e) => {
    setCheckedVietnamese(e.target.checked);
  };

  const handleAlbum = (e, newValue) => {
    setIsAlbum(newValue);
  };
  const handleColor = (e, newValue) => {
    setColorMode(newValue);
  };

  const matchDownSm = useMediaQuery("(max-width:500px)");
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
    <div
      style={{
        background: colorMode == "dark" ? "#1a1a1a" : "",
        color: colorMode == "dark" ? "#ddd" : "",
      }}
    >
      {data ? (
        <>
          <div className={styles.blogsection}>
            {data.threeJS ? (
              <div
                style={{
                  background: "#111",
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Overlay />
                {data.threeJS && (
                  <Canvas>
                    <Suspense fallback={null}>
                      <Earth />
                    </Suspense>
                  </Canvas>
                )}
                <title>{data.title}</title>
              </div>
            ) : (
              <div
                style={{
                  backgroundImage: `url('${data.imgURL}')`,
                }}
                className={styles.blogheader}
              >
                <title>{data.title}</title>
              </div>
            )}
          </div>

          <article className={styles.article}>
            <TabContext value={colorMode}>
              <TabList onChange={handleColor}>
                <Tab
                  style={{ color: colorMode == "dark" ? "#ddd" : "" }}
                  label={<LightMode />}
                  value="light"
                />
                <Tab
                  style={{ color: colorMode == "dark" ? "#ddd" : "" }}
                  label={<DarkMode />}
                  value="dark"
                />
              </TabList>
            </TabContext>
            <h1>{data.title}</h1>
            <div className={styles.date}>
              Updated on {data.date} by {data.author}
            </div>
            {data.content != "" && (
              <div
                dangerouslySetInnerHTML={{ __html: data.content }}
                className={styles.content}
              ></div>
            )}

            {data.content == "" && (
              <div className={styles.content}>
                <p>
                  For this blog, I can show you how I created the Earth like
                  above using ThreeJS. First, according to ThreeJS
                  documentation, Three.js is a 3D library that tries to make it
                  as easy as possible to get 3D content on a webpage. Three.js
                  is often confused with WebGL since more often than not, but
                  not always, three.js uses WebGL to draw 3D. WebGL is a very
                  low-level system that only draws points, lines, and triangles.
                  To do anything useful with WebGL generally requires quite a
                  bit of code and that is where three.js comes in. It handles
                  stuff like scenes, lights, shadows, materials, textures, 3d
                  math, all things that you would d have to write yourself if
                  you were to use WebGL directly.
                </p>
                <p>
                  First, I installed the necessary libraries to support this
                  small project:{" "}
                </p>
                <ul>
                  <li>three</li>
                  <li>@react-three/fiber</li>
                  <li>@react-three/drei</li>
                </ul>

                <p>
                  You can use yarn or npm to install. I will use npm to install
                  these packages
                </p>

                <div className={styles.highligher}>
                  <SyntaxHighlighter
                    children={` npm i -D three \n npm i -D @react-three/fiber \n npm i -D @react-three/drei`}
                    language="javascript"
                    style={dracula}
                  />

                  <p>
                    So, every ThreeJS project needs a Canvas component as a
                    container. Luckily, @react-three/fiber package supports
                    this. All we have to do is to import{" "}
                    <code>{"<Canvas />"}</code> component, then wrap around the
                    code like below:
                  </p>

                  <SyntaxHighlighter
                    children={` <Canvas> \n  <Suspense fallback={null}> \n    <div /> \n  </Suspense> \n </Canvas>`}
                    language="javascript"
                    style={dracula}
                  />

                  <p>
                    You can see that I added {"<Suspense />"} component, because
                    we want to wait for the components inside the canvas to
                    render properly, since the time to render might be slow.
                  </p>
                  <p>
                    Next, we want to create a new component called "earth"
                    inside the <code>/components</code> folder.
                  </p>
                </div>

                <h2>References</h2>
                <p>https://threejs.org/manual/#en/fundamentals</p>
              </div>
            )}
            {data.threeJS && <div className={styles.threeJS}></div>}
            {data.songList ? (
              <>
                <TabContext value={isAlbum}>
                  <Box sx={{ borderBottom: 1, borderColor: "#aaa" }}>
                    <TabList onChange={handleAlbum} aria-label="Album or Song?">
                      <Tab
                        style={{ color: colorMode == "dark" ? "#ddd" : "" }}
                        label="Playlists"
                        value="1"
                      />
                      <Tab
                        style={{ color: colorMode == "dark" ? "#ddd" : "" }}
                        label="Songs"
                        value="2"
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <ul className={styles.playList}>
                      {data.playList.map((item, i) => (
                        <li key={i} className={styles.playItem}>
                          <div
                            dangerouslySetInnerHTML={{ __html: item.html }}
                            className={styles.embedPlaylist}
                          ></div>
                        </li>
                      ))}
                    </ul>
                  </TabPanel>
                  <TabPanel value="2">
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                      style={{ color: colorMode == "dark" ? "#ddd" : "" }}
                    />{" "}
                    K-POP
                    <Checkbox
                      checked={checkedEnglish}
                      onChange={handleChangeEnglish}
                      inputProps={{ "aria-label": "controlled" }}
                      style={{ color: colorMode == "dark" ? "#ddd" : "" }}
                    />{" "}
                    US-UK
                    <Checkbox
                      checked={checkedVietnamese}
                      onChange={handleChangeVietnamese}
                      inputProps={{ "aria-label": "controlled" }}
                      style={{ color: colorMode == "dark" ? "#ddd" : "" }}
                    />{" "}
                    V-Music
                    <ul className={styles.songList}>
                      {((checked && checkedEnglish && checkedVietnamese) ||
                        (!checked &&
                          !checkedEnglish &&
                          !checkedVietnamese)) && (
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

                      {!checked && checkedEnglish && !checkedVietnamese && (
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

                      {checked && !checkedEnglish && !checkedVietnamese && (
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

                      {!checked && !checkedEnglish && checkedVietnamese && (
                        <>
                          {data.songList
                            .filter((item) => item.category == "Vietnamese")
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

                      {!checked && checkedEnglish && checkedVietnamese && (
                        <>
                          {data.songList
                            .filter((item) => item.category != "Korean")
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

                      {checked && checkedEnglish && !checkedVietnamese && (
                        <>
                          {data.songList
                            .filter((item) => item.category != "Vietnamese")
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

                      {checked && !checkedEnglish && checkedVietnamese && (
                        <>
                          {data.songList
                            .filter((item) => item.category != "English")
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
                  </TabPanel>
                </TabContext>
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
      <div className={styles.commentsection}>
        <DiscussionEmbed
          style={{ color: colorMode == "dark" ? "#ddd" : "#1a1a1a" }}
          shortname={shortName}
          config={disqusConfig}
        />
      </div>
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
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
    ],
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
      date: "1/20/2023",
      author: "Phillip Nguyen",
      imgURL: "/images/spotify.png",
      content:
        "These are my favorite songs between 2022-2023, hopefully we have the same taste of music :) Click on any of the songs below to listen with me on Spotify <3",
      playList: [
        {
          title: "K-Pop Duets (러블리 듀엣)",
          img: "/images/albums/kpopduet.png",
          link: "https://open.spotify.com/playlist/37i9dQZF1DWZYjbSZYSpu6?si=e6168fc7bf9e464e",
          html: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZYjbSZYSpu6?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        },

        {
          title: "Songs to Sing in the Car",
          img: "/images/albums/songstosinginthecar.png",
          link: "https://open.spotify.com/playlist/37i9dQZF1DWWMOmoXKqHTD?si=402856f47f114878",
          html: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWMOmoXKqHTD?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        },
        {
          title: "Chill Out Music Mix",
          img: "/images/albums/chillout.png",
          link: "https://open.spotify.com/playlist/5ePOuw8KEjqHc8meYrz3D4?si=988979b1b7f34542",
          html: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/3Xmow32IqkqlTD0ziFqSrR?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        },
        // {
        //   title: "Your Top Songs 2022",
        //   img: "/images/albums/2022.png",
        //   link: "https://open.spotify.com/playlist/37i9dQZF1F0sijgNaJdgit?si=1efc579380604a7b",
        //   html: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1F0sijgNaJdgit?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        // },
      ],
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
        {
          title: "Okeokeoke",
          singers: "Low G",
          img: "/images/songs/okeokeoke.png",
          link: "https://open.spotify.com/track/3nw5vYaH4qVx8joq3qhtNx?si=a31fe9f3b7034ca4",
          category: "Vietnamese",
        },
        {
          title: "CLME",
          singers: "Andree Right Hand, Hoang Ton, TINLE",
          img: "/images/songs/clme.png",
          link: "https://open.spotify.com/track/1VBJ2QBJjgbcGgsXJbHslR?si=64e011d7ffa542a8",
          category: "Vietnamese",
        },
        {
          title: "Yêu Một Người Có Lẽ",
          singers: "Lou Hoang, Miu Lê",
          img: "/images/songs/yeumotnguoicole.png",
          link: "https://open.spotify.com/track/2o4dDfLK6NVI7TjBm5VoMv?si=8f766b0903124a8a",
          category: "Vietnamese",
        },
        {
          title: "Yêu 5",
          singers: "Rhymastic",
          img: "/images/songs/yeu5.png",
          link: "https://open.spotify.com/track/5U30iZBlmxkpHqzb1OSnBS?si=8b4139f5975e4d8b",
          category: "Vietnamese",
        },
        {
          title: "SO FAR",
          singers: "Binz",
          img: "/images/songs/sofar.png",
          link: "https://open.spotify.com/track/5GXCpnyiCviIiAiZn13tzn?si=6c6822c20f524966",
          category: "Vietnamese",
        },
        {
          title: "Alone, Pt. II",
          singers: "Alan Walker, Ava Max",
          img: "/images/songs/alonept2.png",
          link: "https://open.spotify.com/track/28VbwtsYnj85UEODGpQRem?si=95c42c923b8f4338",
          category: "English",
        },
        {
          title: "2AM",
          singers: "Justatee, BigDaddy",
          img: "/images/songs/2am.png",
          link: "https://open.spotify.com/track/3DLtPObflLQBodZN8qGODT?si=69c5079e730a46f2",
          category: "Vietnamese",
        },
        {
          title: "Đã Lỡ Yêu Em Nhiều",
          singers: "Justatee, BigDaddy",
          img: "/images/songs/daloyeuemnhieu.png",
          link: "https://open.spotify.com/track/3J3nv18iIrOhca1ZWNeuyW?si=0e24a95692524de8",
          category: "Vietnamese",
        },
        {
          title: "Ocean",
          singers: "Martin Garrix, Khalid",
          img: "/images/songs/ocean.png",
          link: "https://open.spotify.com/track/3nc420PXjTdBV5TN0gCFkS?si=93f451e8b72b4cdb",
          category: "English",
        },
        {
          title: "Inferiority Complex",
          singers: "Park Kyung, EUNHA",
          img: "/images/songs/inferioritycomplex.png",
          link: "https://open.spotify.com/track/4hRA2rCPaCOpoEIq5qXaBz?si=ebc657c8776045dd",
          category: "Korean",
        },
        {
          title: "November Rain",
          singers: "SANNI",
          img: "/images/songs/novemberrain.png",
          link: "https://open.spotify.com/track/6a4AmsD3QRsQWFwc4u5RnD?si=e19a857ab08d410c",
          category: "English",
        },
        {
          title: "Pizza",
          singers: "Martin Garrix",
          img: "/images/songs/pizza.png",
          link: "https://open.spotify.com/track/5oAgI7Pzg6vxuKrfapg3Pi?si=e9e2d112bae048f8",
          category: "English",
        },
        {
          title: "Flex Your Way Out",
          singers: "Sofi de la Torre",
          img: "/images/songs/flexyourwayout.png",
          link: "https://open.spotify.com/track/4PsD3XlOcE6ML0YhSCN80p?si=3f18ff53c0904f12",
          category: "English",
        },
        {
          title: "Tay To",
          singers: "Rapital",
          img: "/images/songs/tayto.png",
          link: "https://open.spotify.com/track/3wNvWpjcNED10BStY9A4l3?si=6e72ffcda69e4b1d",
          category: "Vietnamese",
        },
        {
          title: "Forget About Her",
          singers: "Justatee",
          img: "/images/songs/forgetabouther.png",
          link: "https://open.spotify.com/track/5kJMW3pK49PvQDtpVryHf5?si=88f82668b29441f5",
          category: "Vietnamese",
        },
      ],
    },
    {
      id: 3,
      title: "How I learned ThreeJS",
      date: "1/22/2023",
      author: "Phillip Nguyen",
      imgURL: "/images/threejs.png",
      content: "",
      threeJS: true,
    },
    {
      id: 4,
      title: "My Eighth Tet Holiday in the U.S.",
      date: "1/22/2023",
      author: "Phillip Nguyen",
      imgURL: "/images/tet2023/IMG_0209.jpeg",
      content:
        "<img style='width: 182px; float: left; margin: 0 10px 10px 10px; border: 5px solid white; border-radius: 2px' src='https://i.imgur.com/ppowji3.jpg' /><p>January 22, 2023 @ Omaha, NE</p><p> I am sitting here in my room, thinking about how I felt about this 8th Tet holiday in Nebraska, and how I missed being home, in which at those times, I loved helping my parents prepare for a Vietnamese New Year’s meal back in Vietnam.</p><p>Tet holiday, or Lunar New Year, came sooner than most years in the past. Even I couldn’t believe how fast a new year was coming and how I thought about my 2022. It was a difficult year for most people, because of the global economy’s hardship (and seems to be worse in 2023, so watch out). For me, I can say that 2022 was a success in both academics and work. Especially, my biggest wish for 2022 was accomplished – getting an internship for 2023. I’ve got to shout out to my family, friends, and my girlfriend for being such supportive factors last year.</p><p>Now, pondering the 8th Tet Holiday in the U.S., I imagined it would feel the same from the past 7 years, since I got to taste the traditional food for this event every year: bánh chưng, nem, phồng tôm, canh sườn măng, etc. Not this year though. I was lucky to meet new people from my girlfriend’s relatives and friends. They brought such fun and energetic environment, which was almost exactly what I remembered from my childhood’s experience. Plus, one of the most important traditions, li xi, was brought into the party. I was lucky enough to get one even though I was not supposed to get it in my age haha! Anyway, hopefully this lucky money brings me luck this year. </p><p>However, even all of these, I still missed Tet in Vietnam. It is just so unique that nowhere in the world can replicate the authentic atmosphere when everyone buys peach branch before the New Year’s Eve, cleans up the whole house to “invite their ancestors” to enjoy the food with the family, or goes to each other’s home to wish a Happy New Year. In the future, I hope I have some time to go back to completely enjoy Tet in Vietnam once again. </p>",
    },
  ];

  const data = postData[params.id - 1];
  return {
    props: {
      data,
    },
  };
}
