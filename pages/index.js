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
import { Paper, Stack } from "@mui/material";

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
                <p>What I Have Done So Far</p>
              </div>
            </div>
            {/* <Paper className={styles.exppaper}>
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
            </Paper> */}
            <section className={styles.resumesection}>
              <h2 className={styles.sectiontitle}>Experience</h2>
              <div className={styles.resumeitem}>
                <h3 className={styles.resumetitle}>
                  Software Engineering Intern, PortalX
                </h3>
                <p className={styles.resumesubtitle}>
                  May 2022 - Oct 2022 | VinAI, Hanoi, Vietnam
                </p>
                <ul className={styles.resumedetails}>
                  <li>
                    Built a feature for PortalX dashboard to allow customer,
                    admin, and annotators to manage and annotate using different
                    versions of guidelines depending on roles with Keycloak,
                    React Redux
                  </li>
                  <li>
                    Designed and built a RemoTasks-like training portal to
                    assist annotators in understanding the concepts and
                    application of labeling 2D/3D images.
                  </li>
                  <li>Leveraged Knowledge: React, Redux, Python, PostgreSQL</li>
                </ul>
              </div>
              <div className={styles.resumeitem}>
                <h3 className={styles.resumetitle}>
                  Graduate Research Assistant
                </h3>
                <p className={styles.resumesubtitle}>
                  March 2020 - May 2022 | University of Nebraska-Lincoln,
                  Lincoln, NE
                </p>
                <ul className={styles.resumedetails}>
                  <li>
                    Lead the team to create software to help automate into Excel
                    by comparing points among different biological conditions at
                    the same time using T-test and ANOVA and posthoc test using
                    Python
                  </li>
                  <li>
                    Built a simple application using Python and Tkinter to
                    automatically delete cell contents when the appearance of
                    the data is less than 65% and to empty cells when the data
                    reaches 0.01
                  </li>
                  <li>Improved the Metabolomic team’s performance by 240%</li>
                  <li>
                    Assisted with development of scientific software for data
                    analysis and pathway modeling and improved the HelikarLab’s
                    team performance by 5%
                  </li>
                  <li>
                    Implemented PDF generator to create and send remote
                    certificate of completion for students who subscribed and
                    upgraded the premium educational plan.
                  </li>
                  <li>
                    Built automated unit tests to test features that run on
                    cellcollective.org using Cypress.io
                  </li>
                  <li>
                    Leveraged Knowledge: Python, Selenium, Tkinter, Microsoft
                    Excel, ReactJS, PassportJS, NodeJS, PostgreSQL, Cypress
                  </li>
                </ul>
              </div>
              <div className={styles.resumeitem}>
                <h3 className={styles.resumetitle}>.NET Engineering Intern</h3>
                <p className={styles.resumesubtitle}>
                  May 2019 - Aug 2019 | SAVIS Technology Group, Hanoi, Vietnam
                </p>
                <ul className={styles.resumedetails}>
                  <li>
                    Built an API to generate PDF file of the Business e-Invoice
                    from the company’s client.
                  </li>
                  <li>
                    Accomplished the development of e-Invoice application faster
                    and more efficiently by 5% of the plan
                  </li>
                  <li>
                    Created a .NET Core project to manage vacation request from
                    multiple users in a company and connected to Linux
                    environment
                  </li>
                  <li>
                    Leveraged knowledge: MVC, ASP.NET Core, Entity Framework 6,
                    C#, HTML {"&"} CSS, Node.js
                  </li>
                </ul>
              </div>
            </section>
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
                    <Card key={i} sx={{ maxWidth: 345, height: 420 }}>
                      <Link href={item.projectLink}>
                        <CardMedia
                          component="img"
                          alt={item.projectName}
                          sx={{ height: 180 }}
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
