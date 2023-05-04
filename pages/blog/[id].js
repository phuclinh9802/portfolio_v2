/* eslint-disable react/no-children-prop */
import Head from "next/head";
import { Suspense, useEffect, useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import { Box, Typography, useMediaQuery } from "@mui/material";
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

import Overlay from "../../components/overlay";
import Earth from "../../components/earth";
import styles from "../../styles/blog.module.css";
import Navbar from "../../components/navbar";

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
        background: colorMode == "dark" ? "#171B26" : "",
        color: colorMode == "dark" ? "#f4f9ff" : "",
      }}
    >
      <Head>
        <title>{data.title}</title>
      </Head>
      {/* <div>
        <Navbar />
      </div> */}
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
                {/* <Overlay /> */}
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

          <article
            className={styles.article}
            // style={{ backgroundColor: colorMode == "dark" ? "#373b48" : "" }}
          >
            <div
              style={{
                padding: "30px 50px",
                backgroundColor: colorMode == "dark" ? "#1e2432" : "",
                borderRadius: "5px",
              }}
            >
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
              <Typography
                variant="subtitle2"
                color={colorMode == "dark" ? "#888" : "#aaa"}
                className={styles.date}
              >
                Updated on {data.date} by {data.author}
              </Typography>
              {data.content != "" && (
                <Typography variant="body2">
                  <div
                    dangerouslySetInnerHTML={{ __html: data.content }}
                    className={styles.content}
                  ></div>
                </Typography>
              )}

              {data.content == "" && (
                <div className={styles.content}>
                  <p>
                    For this blog, I can show you how I created the Earth like
                    above using ThreeJS. First, according to ThreeJS
                    documentation, Three.js is a 3D library that tries to make
                    it as easy as possible to get 3D content on a webpage.
                    Three.js is often confused with WebGL since more often than
                    not, but not always, three.js uses WebGL to draw 3D. WebGL
                    is a very low-level system that only draws points, lines,
                    and triangles. To do anything useful with WebGL generally
                    requires quite a bit of code and that is where three.js
                    comes in. It handles stuff like scenes, lights, shadows,
                    materials, textures, 3d math, all things that you would d
                    have to write yourself if you were to use WebGL directly.
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
                    You can use yarn or npm to install. I will use npm to
                    install these packages
                  </p>

                  <div className={styles.highligher}>
                    <SyntaxHighlighter
                      children={` npm i -D three \n npm i -D @react-three/fiber \n npm i -D @react-three/drei`}
                      language="javascript"
                      style={dracula}
                    />
                    <p>
                      Now, since this is a combination of ThreeJS and NextJS, we
                      can manipulate the code inside{" "}
                      <code>/pages/index.js</code> file
                    </p>
                    <p>
                      So, every ThreeJS project needs a Canvas component as a
                      container. Luckily, @react-three/fiber package supports
                      this. All we have to do is to import{" "}
                      <code>{"<Canvas />"}</code> component, then wrap around
                      the code like below:
                    </p>

                    <SyntaxHighlighter
                      children={` <Canvas> \n  <Suspense fallback={null}> \n    <Earth /> \n  </Suspense> \n </Canvas>`}
                      language="javascript"
                      style={dracula}
                    />

                    <p>
                      You can see that I added {"<Suspense />"} component from
                      React library, because we want to wait for the components
                      inside the canvas to render properly, since the time to
                      render might be slow.
                    </p>
                    <p>
                      Next, we want to create a new component called {'"'}Earth
                      {'"'} inside the <code>/components</code> folder, so we
                      will create a file called <code>earth.js</code>. Since we
                      will work with the Earth as the texture of the object, we
                      can download the texture online through{" "}
                      <Link
                        className={styles.solarlink}
                        href="https://www.solarsystemscope.com/textures/"
                      >
                        Solar System Scope
                      </Link>
                    </p>

                    <p>
                      To continue, follow the code below inside{" "}
                      <code>/components/earth.js</code> :
                    </p>
                    <SyntaxHighlighter
                      children={` import React, { useRef } from "react"; \n import { useFrame, useLoader } from "@react-three/fiber"; \n import * as THREE from "three"; \n import { OrbitControls, Stars } from "@react-three/drei"; \n import { TextureLoader } from "three" \n export default function Earth() { \n  const [texture, specular, cloud, normal] = useLoader(TextureLoader, ["/images/threejs/8k_earth_daymap.jpeg", "/images/threejs/8k_earth_specular_map.jpg", "/images/threejs/8k_earth_clouds.jpeg", "/images/threejs/8k_earth_normal_map.jpg", ]); \n  const earthRef = useRef(); \n  const cloudRef = useRef(); 
                    \n  useFrame(({ clock }) => { \n   const elapsedTime = clock.getElapsedTime(); \n   earthRef.current.rotation.y = elapsedTime / 8; \n   cloudRef.current.rotation.y = elapsedTime / 6; \n  });
                    \n  return ( \n   <> \n      <pointLight color="#fff" intensity={2} position={[2, 0, 4]} /> \n      <Stars radius={400} depth={50} count={20000} factor={5} fade={true} /> \n      <mesh ref={cloudRef}> \n       <sphereGeometry args={2.05, 64, 64} /> \n       <meshPhongMaterial \n        map={cloud} opacity={0.4} depthWrite={true} transparent={true} side={THREE.DoubleSide} \n       /> \n      </mesh> \n      <mesh ref={earthRef}> \n       <spehereGeometry args={[2, 64, 64]} /> \n       <meshPhongMaterial specularMap={specular} /> \n       <meshStandardMaterial \n        map={texture} \n        normalMap={normal} \n        metalness={0.4} \n        roughness={0.7} \n       /> \n       <OrbitControls enableZoom={false} enableRotate={true} /> \n      </mesh> \n    </> \n  ); \n }`}
                      language="javascript"
                      style={dracula}
                    />
                    <p></p>
                    <p>
                      As you can see, we need to use several components for our{" "}
                      {'"'}Earth{'"'} to work. First, we need to download and
                      put the .jpg and .jpeg files for the earth{"'"}s textures
                      inside <code>/public/images</code> folder. Then, we use{" "}
                      <code>useLoader</code> hook from{" "}
                      <code>@react-three/fiber</code> to load the textures.
                      Next, we can see that I used the <code>useFrame</code>{" "}
                      hook to render on every frame (we want the earth to spin
                      infinitely, correct?) The code inside{" "}
                      <code>useFrame</code> hook will execute the code which
                      helps our Earth rotate in the horizontal direction with
                      the speed of <code>elapsedTime / 8</code> (You can play
                      around with this by changing the value of the
                      denominator.) Same for the <code>cloudRef</code>.
                    </p>
                    <p>
                      For more information, please visit the references below
                      for further details. Now, we can import our Earth
                      component inside <code>index.js</code> file. Well done!!!
                      It works.
                    </p>
                  </div>

                  <h2>References</h2>
                  <p>
                    <Link
                      className={styles.solarlink}
                      href="https://threejs.org/manual/#en/fundamentals"
                    >
                      ThreeJS Fundamentals
                    </Link>
                  </p>
                  <p>
                    <Link
                      className={styles.solarlink}
                      href="https://www.youtube.com/watch?v=ymavtyRpT0E"
                    >
                      ThreeJS Tutorial
                    </Link>
                  </p>
                </div>
              )}
              {data.threeJS && <div className={styles.threeJS}></div>}
              {data.songList ? (
                <>
                  <TabContext value={isAlbum}>
                    <Box sx={{ borderBottom: 1, borderColor: "#aaa" }}>
                      <TabList
                        onChange={handleAlbum}
                        aria-label="Album or Song?"
                      >
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
            </div>
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
        <div
          style={{
            padding: "20px",
            backgroundColor: colorMode == "dark" ? "#1e2432" : "",
            borderRadius: "5px",
          }}
        >
          <DiscussionEmbed
            style={{ color: colorMode == "dark" ? "#ddd" : "#1a1a1a" }}
            shortname={shortName}
            config={disqusConfig}
          />
        </div>
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
      { params: { id: "5" } },
      { params: { id: "6" } },
      { params: { id: "7" } },
      { params: { id: "8" } },
      { params: { id: "9" } },
      { params: { id: "10" } },
      { params: { id: "11" } },
      { params: { id: "12" } },
      { params: { id: "13" } },
      { params: { id: "14" } },
      { params: { id: "15" } },
      { params: { id: "16" } },
      { params: { id: "17" } },
      { params: { id: "18" } },
      { params: { id: "19" } },
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
        "<p>This is my first blog ever! I am glad I finally decided to create one, due to my laziness, lol. Anyway, I and Nguyet, my girlfriend, just had a blast in one of the most beautiful and intelligent cities in the United States, Seattle, Washington. There is a myriad of attraction such as Space Needle, Museum of Pop Culture (MoPOP), Chihuly Garden and Glass (a must-see IMO), Pike Place Market, Seattle Great Wheel, and so on. Especially, Pike Place Market is famous in Seattle because it's one of the oldest continually running markets in the country, according to travelleming.com. Here, we tried the clam chowder, which is awarded the best clam chowder in the nation. A fun experience in this attraction indeed, not only was because of the food, but also was the people and the environment they brought to the visitors. I remembered when we are offered to try samples of three types of cooked salmon and were amazed at how unique and delicious they were. “Have you ever tried Salmon Candy?”, asked the fisherman. We were confused: “Wait, Salmon Candy? What do you mean? Do they taste sweet?”. Indeed, they were meaty but sweet at the same time, thus our new favorite dessert was introduced. You must try it once when coming to the market. </p><p>We also visited the Space Needle, one of the most famous attractions of the country, if not of the world. Because we travelled either when people were working, or when COVID-19 still spread, not many people were there with us. Therefore, Nguyet and I could enjoy fully the experience of capturing the sunny day (which was rare) in Seattle City from the observatory deck (Like the image above). There are so many pictures we took from the deck that I will create a gallery right here so people can see how beautiful the scene looks like when Seattle weather is nice and peaceful. </p><p>Speaking about Seattle, we could not miss the first Starbucks ever, Starbucks Reserve Roastery, located in 1124 Pike St, Seattle, WA 98101. From the first look outside, the store seemed to be more modern than I imagined. However, the coffee makers, and the roasting process were displayed like it was in the past. We got ourselves our favorite drinks: Peppermint Oatmilk Mocha and Hazelnut Bianco Latte. </p><p>We visited many more attractions, and like I said, I have created a gallery for you to follow and see what they looked like. Oh, and I guess this is the most important thing to consider when traveling to Seattle: You do not even need to rent a vehicle, since Seattle contains tons of public transportation, such as Link Light Rail, Metro Public Bus, Monorail, etc. The transportation is also cheap if you are not planning to stay here long, which only ranges around $3-$8 per trip based on your need. </p><p>Finally, for the budget, we spent the total of around $1000, including round-trip plane tickets, AirBnB, CityPass (you might want to visit this before considering to visit Seattle), and miscellaneous things (food, traveling place to place, shopping,…). </p><p>In conclusion, writing this for the first time was really fun, since I could feel reminiscent about how fun we spent our time in Seattle and ingrain in my memory. I will try to write more of this in the future! Please stay tuned.</p>",
      songList: null,
      type: "general",
    },
    {
      id: 2,
      title: "My Favorite Songs for 2023",
      date: "05/04/2023",
      author: "Phillip Nguyen",
      imgURL: "/images/spotify.png",
      content:
        "These are my favorite songs between 2022-2023, hopefully we have the same taste of music :) Click on any of the songs below to listen with me on Spotify <3",
      type: "general",
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
        {
          html: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0cYXur6dw0o3ZTsg54jmje?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        },

        {
          title: "Millenium K-Pop",
          img: "/images/albums/2022.png",
          link: "https://open.spotify.com/playlist/37i9dQZF1DWUoY6Ih7vsxr?si=3df6d8656aac4a43",
          html: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWUoY6Ih7vsxr?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        },
        {
          title: "QNT Radio",
          img: "/images/albums/2022.png",
          link: "https://open.spotify.com/embed/playlist/37i9dQZF1E4wXMtaoAbs52?utm_source=generator",
          html: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1E4wXMtaoAbs52?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        },
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
        {
          title: "Tình Yêu Ngủ Quên",
          singers: "Hoàng Tôn, LyHan",
          img: "/images/songs/tinhyeunguquen.png",
          link: "https://open.spotify.com/track/2MjpqyEA73TzenhDmj0RFN?si=99679d68eb414341",
          category: "Vietnamese",
        },
        {
          title: "Buồn Thì Cứ Khóc Đi",
          singers: "Lynk Lee",
          img: "/images/songs/buonthicukhocdi.png",
          link: "https://open.spotify.com/track/6iXGivPFpsqKmrINhIbPvx?si=e1e417ef50074436",
          category: "Vietnamese",
        },
        {
          title: "All Rise",
          singers: "Blue",
          img: "/images/songs/allrise.png",
          link: "https://open.spotify.com/track/7jley98gCQFueQ5MCaFWIb?si=ff3a9ba4f04c40c1",
          category: "English",
        },
        {
          title: "Blue",
          singers: "Big Bang",
          img: "/images/songs/blue.png",
          link: "https://open.spotify.com/track/4LOLvDtzykDC7y9WehFoOi?si=fa5381904799433f",
          category: "Korean",
        },
        {
          title: "Bad Boy",
          singers: "Big Bang",
          img: "/images/songs/blue.png",
          link: "https://open.spotify.com/track/7GLlnuHjYIKy3YR59ziaQe?si=fd319400e0ab4d3e",
          category: "Korean",
        },
        {
          title: "I Want It That Way",
          singers: "Backstreet Boys",
          img: "/images/songs/iwantitthatway.png",
          link: "https://open.spotify.com/track/47BBI51FKFwOMlIiX6m8ya?si=862ace8d771842b6",
          category: "English",
        },
        {
          title: "The Call",
          singers: "Backstreet Boys",
          img: "/images/songs/thecall.png",
          link: "https://open.spotify.com/track/1mxTCArq9EhSg4QPGqhjhT?si=b3f084fb6fcc4b67",
          category: "English",
        },
        {
          title: "It's You",
          singers: "SUPER JUNIOR",
          img: "/images/songs/itsyou.png",
          link: "https://open.spotify.com/track/2TG8kKgwsyyZU8lZIH6SZ1?si=bb6a4447af50400c",
          category: "Korean",
        },
        {
          title: "View",
          singers: "SHINee",
          img: "/images/songs/view.png",
          link: "https://open.spotify.com/track/46E1ic6n099e76t5J1TbHn?si=d4125a37637045bd",
          category: "Korean",
        },
        {
          title: "Thu Cuối",
          singers: "YanBi, Mr T, Hang BingBoong",
          img: "/images/songs/thucuoi.png",
          link: "https://open.spotify.com/track/5ZMDJIYgsZWHXw2ILFblva?si=53a373b58e984f9a",
          category: "Vietnamese",
        },
        {
          title: "vaicaunoicokhiennguoithaydoi",
          singers: "GREY D, tlinh",
          img: "/images/songs/vaicaunoicokhiennguoithaydoi.png",
          link: "https://open.spotify.com/track/25h0TqC9H3BcMA7KjK5nHK?si=acc0e1fb2bcd48b2",
          category: "Vietnamese",
        },
        {
          title: "Có hẹn với thanh xuân",
          singers: "MONSTAR",
          img: "/images/songs/cohenvoithanhxuan.png",
          link: "https://open.spotify.com/track/54UNNgtE3zzERwTuWSQLqd?si=4a1f26de95464af8",
          category: "Vietnamese",
        },
        {
          title: "A Champion from the Ashes",
          singers: "Third Age",
          img: "/images/songs/achampionfromtheashes.png",
          link: "https://open.spotify.com/track/1O3e3Mo21mwupNgCeZk9p0?si=e9203661ef884c9f",
          category: "English",
        },
        {
          title: "Phố Đã Lên Đèn",
          singers: "Huyền Tâm Môn",
          img: "/images/songs/phodalenden.png",
          link: "https://open.spotify.com/track/47Y12sZlWlug3AceKoS5Hh?si=7aec813c2a244355",
          category: "Vietnamese",
        },
        {
          title: "An Thần",
          singers: "Low G",
          img: "/images/songs/anthan.png",
          link: "https://open.spotify.com/track/5T6j0rfpCDBzAxC8Fpd0N7?si=42b23eb216de41ce",
          category: "Vietnamese",
        },
        {
          title: "She Neva Knows",
          singers: "Justatee",
          img: "/images/songs/shenevaknows.png",
          link: "https://open.spotify.com/track/0NyrI1tMvqcK3vU5z9DMdI?si=f0bdf2a01be442e7",
          category: "Vietnamese",
        },
        {
          title: "So Far Away",
          singers: "Martin Garrix",
          img: "/images/songs/sofaraway.png",
          link: "https://open.spotify.com/track/0OlnLZY4cmQzT6ZGttvWBM?si=7911837037ae4dbb",
          category: "English",
        },
        {
          title: "Tạm Biệt Nhé",
          singers: "Lynk Lee",
          img: "/images/songs/tambietnhe.png",
          link: "https://open.spotify.com/track/1SAMe41ZkT2W4zJ4qdqEdM?si=7f5438d72eef476b",
          category: "Vietnamese",
        },
        {
          title: "Love Scenario",
          singers: "iKON",
          img: "/images/songs/lovescenario.png",
          link: "https://open.spotify.com/track/3d3ELsqKlQ7WA0a10Isu3l?si=80da3282d4db4451",
          category: "Korean",
        },
        {
          title: "If You",
          singers: "Big Bang",
          img: "/images/songs/ifyou.png",
          link: "https://open.spotify.com/track/4kaY4LbdbomICC25gYGGtn?si=3d6ed8bda3d840a0",
          category: "Korean",
        },
        {
          title: "As Long As You Love Me",
          singers: "Backstreet Boys",
          img: "/images/songs/aslongasyouloveme.png",
          link: "https://open.spotify.com/track/00WvmRXTkPBZNhhRK3xfdy?si=e18cc3725e0545f6",
          category: "English",
        },
        {
          title: "Lạ Lùng",
          singers: "Vũ",
          img: "/images/songs/lalung.png",
          link: "https://open.spotify.com/track/5Bti0azlFhMattVY76qFr9?si=d8ca28263d534348",
          category: "Vietnamese",
        },
        {
          title: "Eyes, Nose, Lips",
          singers: "TAEYANG",
          img: "/images/songs/eyesnoselips.png",
          link: "https://open.spotify.com/track/0lYtIvI7bO51PZSeK22Mbz?si=83a86d24adec4f48",
          category: "Korean",
        },
        {
          title: "Scared to Be Lonely",
          singers: "Martin Garrix, Dua Lipa",
          img: "/images/songs/scaredtobelonely.png",
          link: "https://open.spotify.com/track/3ebXMykcMXOcLeJ9xZ17XH?si=4fab467800fe4719",
          category: "English",
        },
        {
          title: "Bad Boy",
          singers: "Big Bang",
          img: "/images/songs/badboy.png",
          link: "https://open.spotify.com/track/7GLlnuHjYIKy3YR59ziaQe?si=1540378d82d24487",
          category: "Korean",
        },
      ],
    },
    {
      id: 3,
      title: "How I Created the Earth using ThreeJS & NextJS",
      date: "1/28/2023",
      author: "Phillip Nguyen",
      imgURL: "/images/threejs.png",
      content: "",
      threeJS: true,
      type: "general",
    },
    {
      id: 4,
      title: "My Eighth Tet Holiday in the U.S.",
      date: "1/22/2023",
      author: "Phillip Nguyen",
      imgURL: "/images/tet2023/IMG_0209.jpeg",
      content:
        "<img style='width: 182px; float: left; margin: 0 10px 10px 10px; border: 5px solid white; border-radius: 2px' src='https://i.imgur.com/ppowji3.jpg' /><p>January 22, 2023 @ Omaha, NE</p><p> I am sitting here in my room, thinking about how I felt about this 8th Tet holiday in Nebraska, and how I missed being home, in which at those times, I loved helping my parents prepare for a Vietnamese New Year’s meal back in Vietnam.</p><p>Tet holiday, or Lunar New Year, came sooner than most years in the past. Even I couldn’t believe how fast a new year was coming and how I thought about my 2022. It was a difficult year for most people, because of the global economy’s hardship (and seems to be worse in 2023, so watch out). For me, I can say that 2022 was a success in both academics and work. Especially, my biggest wish for 2022 was accomplished – getting an internship for 2023. I’ve got to shout out to my family, friends, and my girlfriend for being such supportive factors last year.</p><p>Now, pondering the 8th Tet Holiday in the U.S., I imagined it would feel the same from the past 7 years, since I got to taste the traditional food for this event every year: bánh chưng, nem, phồng tôm, canh sườn măng, etc. Not this year though. I was lucky to meet new people from my girlfriend’s relatives and friends. They brought such fun and energetic environment, which was almost exactly what I remembered from my childhood’s experience. Plus, one of the most important traditions, li xi, was brought into the party. I was lucky enough to get one even though I was not supposed to get it in my age haha! Anyway, hopefully this lucky money brings me luck this year. </p><p>However, even all of these, I still missed Tet in Vietnam. It is just so unique that nowhere in the world can replicate the authentic atmosphere when everyone buys peach branch before the New Year’s Eve, cleans up the whole house to “invite their ancestors” to enjoy the food with the family, or goes to each other’s home to wish a Happy New Year. In the future, I hope I have some time to go back to completely enjoy Tet in Vietnam once again. </p>",
      type: "general",
    },
    {
      id: 5,
      title: "Two Sum",
      date: "2/15/2023",
      author: "Phillip Nguyen",
      imgURL: "https://miro.medium.com/max/1400/1*2x-CAwfeui5YM4148VxgRA.jpeg",
      content:
        "<p>First, we have the input, for instance, <code style='font-size: 1.15em'> nums = [2, 7, 9, 10]</code>, and <code style='font-size: 1.15em'>target = 9 </code>. We want to output the two distinct index of elements that sum up to the target. For this problem, we can use brute force approach, by using nested loops <code style='font-size: 1.15em'>for i=0:len(nums) for j=1:len(nums)</code> to compare with the condition <code style='font-size: 1.15em'>if nums[i] + nums[j] == target: return [i, j]</code>. However, this approach is ineefficient since the time complexity for this approach is <code style='font-size: 1.15em'>O(n^2)</code>, since we need to compare 1 element by n - 1 elements.</p><p>Other approach is to use hash map. We can initialize the hash map <code style='font-size: 1.15em'>hash_map = {}</code>, then populate the hash map by one for loop with <code style='font-size: 1.15em'>(key, value) = (nums[i], i)</code>, where i is the index of current element in 'nums' list. Then, we can go through another for loop to check if the difference between target and current num is inside the hash map, and do not forget to make sure the indexes are not the same. If so, we can return both indexes of 2 elements. We solved the first problem on Leetcode! </p><p><img width='700' height='350' src='/images/leetcode/twosums.png' alt='two sums' /></p></p><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 6,
      title: "Valid Anagrams",
      date: "2/16/2023",
      author: "Phillip Nguyen",
      imgURL: "https://i.ytimg.com/vi/51RUl4xe8AE/maxresdefault.jpg",
      content:
        "<p>Welcome to Valid Anagram problem. But first, we need to understand: What is Anagram? Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.We now know what it is, let's solve this problem.</p><p>For this problem, we can use brute force approach to check for every count of every character in each string. However, this solution is not efficient. We will use hash map to solve this problem. That way, even though we increase the space complexity by <code style='font-size: 1.15em'>O(n)</code>, we have <code style='font-size: 1.15em'>O(n)</code> in time complexity also. We will initialize 2 hash maps to compare 2 strings. Then, we handle the edge case where if lengths of both strings are not equal, we just return false. After that, we proceed to the algorithm through a for loop. Increment the character by 1 whenever a character is reached. Return the condition: if hash map string 1 equates hash map string 2, then return true, else return false. Below is the solution:</p><img width='700' height='350' src='/images/leetcode/validanagram.png' alt='valid anagram' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 7,
      title: "Contains Duplicate",
      date: "2/20/2023",
      imgURL: "/images/leetcode/containsduplicate.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Contains Duplicate problem! This time, we are going to solve this easy problem from Leetcode. The problem is simple: Given an integer array nums, return <code style='font-size: 1.15em'>true</code> if any value appears at least twice in the array, meaning duplicate happens, and return <code style='font-size: 1.15em'>false</code> if every element is distinct.</p><p>For this problem, we can use hash map to complete it. Then, we can go through for loop, then check if current num element is in the hash map. If so, we return True. Else, we add that element to the hash map. Overall, this is a pretty easy problem for starters. The time complexity is <code style='font-size: 1.15em'>O(n)</code>, and space complexity is <code style='font-size: 1.15em'>O(n)</code>, since we potentially add every element inside nums array to hash map. The solution is below: <p><img width='700' height='350' src='/images/leetcode/containsduplicatesolution.png' alt='contains duplicate' /></p></p><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 8,
      title: "Group Anagrams",
      date: "2/22/2023",
      imgURL: "https://miro.medium.com/max/1200/1*EsgoZCXJp7PlMetgT3vJVg.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Group Anagrams Problem! In this problem, we are trying to group the anagrams together. For example: given input being a string list: <code style='font-size: 1.15em'>['eat', 'tea', 'tan', 'ate', 'nat', 'bat']</code>, the output should be <code style='font-size: 1.15em'>[['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]</code>. First, let's review the definition of an anagram. An anagram is word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.</p><p>So, we know the requirements for this problem. We can now dive into the solution. We can use a hash map for this problem, with key being tuple of count list which represents the list of 0's with length of 26, representing count of each character in each string element. We can then proceed to the for loop. Then, initialize count list inside the for loop so that every time we are done with the iteration, we reset the count list. Then, for nested loop, we loop through each character of current string, and increment each character's count inside the count list. After done with the iteration of characters, we can exit that for loop, and append the string according to the tuple of current count list. We should be able to return the values of the hashmap, which consists of list elements with grouped anagrams.</p><img width='700' height='350' src='/images/leetcode/groupanagrams.png' alt='group anagrams' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 9,
      title: "Valid Palindrome",
      date: "3/10/2023",
      imgURL: "/images/leetcode/validpalindrome.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Valid Palindrome Problem! In this problem, we are going to return the condition if the reverse of current string is exactly the same as original string. But first, we need to understand, what is 'palindrome'? A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Now, let's get started.</p><p>For Python, it is not difficult, since we have the convenient manipulation of a list, e.g.: <code style='font-size: 1.15em'>nums[::-1]</code> will give us the reversed of that list, and the same applies to strings. Therefore, we can just create a new empty string, go through each character in original string by using for loop, then check for alphanumeric characters by using the built-in function <code style='font-size: 1.15em'>.isalnum()</code> which returns true if the character is alphanumeric character. Then, we can add to the end of the newly initialized string. We then should be able to return the boolean value if original string = reversed string. We are now done!</p><img width='700' height='350' src='/images/leetcode/validpalindromesolution.png' alt='valid palindrome' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 10,
      title: "Two Sum II - Input Array Is Sorted",
      date: "3/13/2023",
      imgURL: "/images/leetcode/twosumsorted.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Two Sum II problem! This problem is basically the special version from Two Sum problem, where elements in the original list/array are sorted. Let us solve this problem!</p><p>First, we can use two pointers, one from the start of the list, and one at the end of the list. The reason why is that we can move the pointers according to the current sum of 2 elements at current pointers. If the value exceeds target, we move the right pointer to the left by 1. If the value is less than the target, we shift the left pointer to the right by 1. When we found the value of 2 pointers which equates to the target, we return the indexes of 2 pointers (remember to increment the indexes by 1 because of the requirement). Here is the solution:</p><img width='700' height='350' src='/images/leetcode/twosumsorted.png' alt='two sum ii' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 11,
      title: "Top K Frequent Elements",
      date: "3/14/2023",
      imgURL: "/images/leetcode/topkfrequentelements.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Top K Frequent Elements problem! This problem is a Medium array/hashing problem from Leetcode. For this problem, given an integer array nums and an integer k, we need to return the k most frequent elements. You may return the answer in any order. We have multiple approaches for this problem. For me, I use Bucket Sort and hash maps. We initialize 2 hash maps; one is to count the frequency of an element (in [1,1,1,2,2,3], we have {1: 3, 2: 2, 3: 1}), and one is to store the element with the same frequency (in the mentioned list, we have 3 separated key - val: {1: [3], 2: [2], 3: [1]}). Then, we go from right to left for the second hash map to find the elements with highest k frequencies. We are done with the problem! Below is the solution.</p><img width='700' height='450' src='/images/leetcode/topksolution.png' alt='top k freq el' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 12,
      title: "3Sum",
      date: "3/15/2023",
      imgURL: "/images/leetcode/3sum.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to 3Sum problem! In this problem, we are given an integer array 'nums', and we need to return all the triplets such that three indexes of those triplets are different, and they sum up to 0. Also, note that the solution does not contain duplicates.</p><p>For this problem, we will apply Two Sum II problem that we solved in my previous blog, where we have 2 pointers to check for current sum. First, we need to sort the array to apply Two Sum II. Then, we proceed to the for loop. We need to check for duplicates as well: if the current element is the same as the adjacent and previous element, skip it. Else, we can go to the nested while loop with condition being the same as Two Sum: j and k. if the temporary sum < 0 or > 0, we can move left pointer to the right or right pointer to the left. If the current sum = 0, then we add to the output list, then increment the left pointer by 1. There is one catch to this. To optimize the problem, we can check immediately for the duplicates by using while loop, and continually move the left pointer to the right when current element in j has the same value as the previous one. We are done with this problem!</p><img width='700' height='600' src='/images/leetcode/3sumsolution.png' alt='3Sum' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 13,
      title: "Container with Most Water",
      date: "3/18/2023",
      imgURL: "/images/leetcode/containerwithmostwater.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Container with Most Water problem! In this problem,  we are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.</p><p>We can use two pointers method to solve it. First, initialize a result variable maxArea to constantly update if tempArea > maxArea. Temporary area will be the difference between 2 elements at current left and right pointers multiplied by the min height between 2 elements. Then, we have 2 conditions: <ul><li>if height at left pointer < height at right pointer, then move left pointer to the right by 1</li><li>else if height at left pointer >= height at right pointer, then move right pointer to the left by 1.</li></ul>We keep going through the loop until 2 pointers meet each other. We are done!</p><img src='/images/leetcode/cwmwsolution.png' width='700' height='350' alt='Container with Most Water' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 14,
      title: "Product of Array Except Self",
      date: "3/20/2023",
      imgURL: "/images/leetcode/productexceptself.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Product of Array Except Self problem! In this problem, we are given an array of numbers, and we are required to return an 'answer' array such that answer[i] is equal to the product of all the elements of nums except nums[i]. The problem also requires us to write the code in linear time O(n).</p><p>For this problem, we can use 2 lists 'prefix' and 'postfix' containing the product from previous elements and next elements from current position. For example, we have the list [1,2,3,4]. Then the prefix will be [1, 2, 6, 24], where: <ul><li>prefix[0] = 1 since there is no numbers before that</li><li>prefix[1] = 2, since previously we only have 1 as the previous number.</li><li>prefix[2] = 6, since we have 2 elements before current position: 1 and 2. We take the product of 3 elements and push to prefix list. </li><li>prefix[3] = 24, since the product of previous 3 elements are 1 * 2 * 3 = 6. We multiply with current element, then 6 * 4 = 24. </li></ul>Same with postfix, where postfix = [24,24,12,4]. After that, we go through the loop with length of original array. Append the product of prefix[i+1] and postfix[i-1] to the output array if current number is not from the start and the end of the array. If the element is from the start of the list, append postfix[i + 1] to the list. Otherwise, if the element is from the end of the list, append prefix[i - 1] to the list. We are done! </p><img src='/images/leetcode/prodexceptselfsolution.png' alt='product except self' width='700' height='600' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 15,
      title: "Valid Parentheses",
      date: "3/23/2023",
      imgURL: "/images/leetcode/validparentheses.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Valid Parentheses problem! In this problem, we are given a string s containing the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.</p><p>There are 3 main conditions: <ul><li>Open brackets must be closed by the same type of brackets</li><li>Open brackets must be closed in the correct order.</li><li>Every close bracket has a corresponding open bracket of the same type.</li></ul></p><p>To solve this problem, we can use a data structure called 'stack', where stack is appended when the character is an opening bracket, and pop if it is a closing bracket. We should also use hash map with (key - value) = (closing bracket : opening bracket), such as {']': '['}. We then proceed to the loop through every character of the string. Check if current character is an opening bracket, then add it to the stack. Otherwise, check if the stack is currently empty (meaning there are no opening bracket, but the current character is a closing bracket), or if the opening bracket matching to the current closing bracket is not matching the current opening bracket inside the stack, then return false. Else return true. We are done!</p><img src='/images/leetcode/validparenthesessolution.png' alt='valid parentheses' width='700' height='400'/><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 16,
      title: "Min Stack",
      date: "3/30/2023",
      imgURL: "/images/leetcode/minstack.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Min Stack problem! In this problem, we are changing the gear a bit, where we are required to design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).</p><p>The most important piece of information here is we have to implement the solution in O(1) for each function. Therefore, we can use stack to solve this problem. We need 3 variables for this MinStack class: one stack to store the current pushed element, one stack to store current min value in current stack element, and one min variable to store current min value. The first method is void push(int val): pushes the element val onto the stack. For  this method, we first need to check if the stack is empty. If so, we append the value to the 'minStack' stack, and set min val to that value. Otherwise, append the value to the main stack, set minimum value to the current minimum value and the value to be added, and append that current min value to the 'minStack' to indicate the min value for a specific stack position.</p><p>Next, we have void pop() function, which removes the element on the top of the stack. For this problem, we can just popo the current stack and minStack, and set current min value to the latest value inside minStack after being popped.</p><p>Next, we got int top(): gets the top element of the stack, which we can just return the latest element in the stack.</p><p>And last but not least, int getMin() function: retrieves the minimum element in the stack, which we can just return the current min value. We are done!</p><img src='/images/leetcode/minstacksolution.png' alt='min stack' width='700' height='800' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 17,
      title: "Binary Search",
      date: "4/5/2023",
      imgURL: "/images/leetcode/binarysearch.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Binary Search problem! This is one of the most basic but important problem when it comes to data structures and algorithm. Normally, to search for an element in the list, we use for loop to iterate through the entire list until we find what we want. However, for this algorithm, we can apply 'Divide and Conquer' concept with 2 pointers left and right representing left most position and rightmost position. We use mid position to compare with the target value. We keep doing that until left and right pointers meet. If none is found, we return -1, else we return the mid index. We are done.</p><img src='/images/leetcode/binarysearchsolution.png' width='700' height='600' alt='binary search' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 18,
      title: "Search a 2D Matrix",
      date: "4/12/2023",
      imgURL: "/images/leetcode/searcha2dmatrix.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Search a 2D Matrix problem. In this problem, we will try to solve using binary search approach with a 2D list. You are given an m x n integer matrix matrix with the following two properties: Each row is sorted in non-decreasing order. The first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise. You must write a solution in O(log(m * n)) time complexity.</p><p>So, we know that each row is non-decreasing, then, we can find the row that the target value exists first, then use binary search to find that target. For this, set top = 0, bottom = len(matrix) as 2 pointers for position of top row and bottom row. Then, we take mid as usual. If target >= matrix[mid][0] and target <= matrix[mid][len(matrix[0])], then we can return row; if target < mtrix[mid][0], proceed to prev row: bottom = mid - 1; else: top = mid + 1</p><p>After that, we are able to find the row that contains the target. We do normal binary search in that particular row. We are done!</p><img src='/images/leetcode/search2d1.png' width='700' height='350'/><img src='/images/leetcode/search2d2.png' width='700' height='600'/><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
    {
      id: 19,
      title: "Best Time to Buy and Sell Stock",
      date: "4/17/2023",
      imgURL: "/images/leetcode/buysellstock.png",
      author: "Phillip Nguyen",
      content:
        "<p>Welcome to Best Time to Buy and Sell Stock. In this problem, we are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit we can achieve from this transaction. If we cannot achieve any profit, return 0.</p><p>We will use sliding window algorithm/technique for this problem, which we will have 2 pointers 'buy' and 'sell' indicating the day to buy and day to sell inside the prices list. So, while the sell pointer has not reached the end of the list yet, or the final day to trade, then if price at the buying day < price at selling day, then we will update the result as the maximum between the current result and the difference between selling and buying day. Otherwise, we continue moving buy to sell, and increment selling day. We solved the problem!</p><img src='/images/leetcode/buysellstocksolution.png' width='700' height='400' /><p>Credit: <a style='text-decoration: underline' href='https://neetcode.io'>neetcode.io</a></p>",
    },
  ];

  const data = postData[params.id - 1];
  return {
    props: {
      data,
    },
  };
}
