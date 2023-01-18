import { useEffect, useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/exp.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import { Stack } from "@mui/material";

export default function Index() {
  const [data, setData] = useState([]);
  const [expTab, setExpTab] = useState(true);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => setData(data));

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjectData(data));
  }, []);

  return (
    <Layout>
      <div className={styles.expsection}>
        <div className={styles.expheader}>
          <div></div>
          <div className={styles.text}>
            <p>Here are some of my experience throughout the years</p>
          </div>
        </div>
        <div className={styles.exptabs}>
          <button onClick={() => setExpTab(true)} className={styles.expbutton}>
            Experience
          </button>
          <button onClick={() => setExpTab(false)} className={styles.expbutton}>
            Projects
          </button>
        </div>
        {expTab ? (
          <div className={styles.explist}>
            <div className={styles.expheading}>
              <div>
                <p>Experience</p>
              </div>
            </div>
            <div className={styles.expitems}>
              <>
                {data.map((item, i) => {
                  return (
                    <div key={i} className={styles.expitem}>
                      <div className={styles.expcomplocation}>
                        <h3 className={styles.company}>
                          {item.companyName} | {item.location}
                        </h3>
                      </div>
                      <div className={styles.titledate}>
                        <p>
                          {item.title} | {item.startDate} - {item.endDate}
                        </p>
                      </div>
                      <div className={styles.expdescription}>
                        <ul>
                          {item.exp.map((subitem, i) => {
                            return <li key={i}>{subitem.desc}</li>;
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
          </div>
        ) : (
          <div className={styles.explist}>
            <div className={styles.expheading}>
              <div>
                <p>Projects</p>
              </div>
            </div>
            <div className={styles.projitems}>
              <>
                {projectData.map((item, i) => {
                  return (
                    <Card key={i} sx={{ maxWidth: 345 }}>
                      <Link href={item.projectLink}>
                        <CardMedia
                          component="img"
                          alt={item.projectName}
                          height="140"
                          image={item.url}
                        />
                      </Link>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.projectName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.desc}
                        </Typography>
                      </CardContent>
                      <CardContent className={styles.tags}>
                        {item.tags.map((tag) => {
                          return (
                            <span className={styles.chip} key={tag}>
                              <Chip
                                style={{ backgroundColor: "#ffeae0" }}
                                label={`#${tag}`}
                              />
                            </span>
                          );
                        })}
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
