export default function Projects(req, res) {
  res.status(200).json([
    {
      id: 1,
      url: "/images/projects/covidtracker.png",
      projectName: "Covid Tracker",
      projectLink: "https://github.com/phuclinh9802/Angular-9-Tracker",
      desc: "This is a Full-stack personal project which helps users watch, research, and analyze real-time U.S. news data and World's COVID-19 data",
      tags: ["Angular", "NodeJS", "CSharp", "MVC", "Python", "MySQL", "AWS"],
    },
    {
      id: 2,
      url: "/images/projects/excel.png",
      projectName: "Automating Excel",
      projectLink: "https://github.com/phuclinh9802/Automating_Excel",
      desc: "Automate Excel using Python and Tkinkter to help scientists be more convenient when calculating data",
      tags: ["Python", "Tkinter", "Selenium", "Splinter", "Excel"],
    },
    {
      id: 3,
      url: "/images/projects/oldport.png",
      projectName: "Portfolio (1st version)",
      projectLink: "https://philsde.com/",
      desc: "This is my first portfolio created with ReactJS, and also my first React Project ever. ",
      tags: ["React", "HTML", "CSS"],
    },
    {
      id: 4,
      url: "/images/projects/restock.png",
      projectName: "Restock",
      projectLink: "https://restock-nextjs.vercel.app/",
      desc: "A simple web application to help users research for their favorite stocks",
      tags: ["React", "NextJS", "financialmodelingprep", "polygon.io"],
    },
    {
      id: 5,
      url: "/images/projects/smi.png",
      projectName: "Stock Market Indicator",
      projectLink: "http://group3sprint.pythonanywhere.com/",
      desc: "A web application to help users keep track of their stocks by managing their own watchlist + news",
      tags: ["Python", "Django", "anychart"],
    },
  ]);
}
