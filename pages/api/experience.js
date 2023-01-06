export default function experience(req, res) {
  res.status(200).json([
    {
      id: 1,
      title: "Software Engineering Intern, PortalX",
      companyName: "VinAI",
      startDate: "May 2022",
      endDate: "Oct 2022",
      location: "Hanoi, Vietnam",
      exp: [
        {
          desc: "Built a feature for PortalX dashboard to allow customer, admin, and annotators to manage and annotate using different versions of guidelines depending on roles with Keycloak, React Redux",
        },
        {
          desc: "Designed and built a RemoTasks-like training portal to assist annotators in understanding the concepts and application of labeling 2D/3D images.",
        },
        {
          desc: "Leveraged Knowledge: React, Redux, Python, PostgreSQL",
        },
      ],
    },
    {
      id: 2,
      title: "Graduate Research Assistant",
      companyName: "University of Nebraska-Lincoln",
      startDate: "March 2020",
      endDate: "May 2022",
      location: "Lincoln, NE",
      exp: [
        {
          desc: "Lead the team to create software to help automate into Excel by comparing points among different biological conditions at the same time using T-test and ANOVA and posthoc test using Python",
        },
        {
          desc: "Built a simple application using Python and Tkinter to automatically delete cell contents when the appearance of the data is less than 65% and to empty cells when the data reaches 0.01",
        },
        {
          desc: "Improved the Metabolomic team’s performance by 240%",
        },
        {
          desc: "Assisted with development of scientific software for data analysis and pathway modeling and improved the HelikarLab’s team performance by 5%",
        },
        {
          desc: "Implemented PDF generator to create and send remote certificate of completion for students who subscribed and upgraded the premium educational plan.",
        },
        {
          desc: "Built automated unit tests to test features that run on cellcollective.org using Cypress.io",
        },
        {
          desc: "Leveraged Knowledge: Python, Selenium, Tkinter, Microsoft Excel, ReactJS, PassportJS, NodeJS, PostgreSQL, Cypress",
        },
      ],
    },
    {
      id: 3,
      title: ".NET Engineering Intern",
      companyName: "SAVIS Technology Group",
      startDate: "May 2019",
      endDate: "Aug 2019",
      location: "Hanoi, Vietnam",
      exp: [
        {
          desc: "Built an API to generate PDF file of the Business e-Invoice from the company’s client.",
        },
        {
          desc: "Accomplished the development of e-Invoice application faster and more efficiently by 5% of the plan",
        },
        {
          desc: "Created a .NET Core project to manage vacation request from multiple users in a company and connected to Linux environment",
        },
        {
          desc: "Leveraged knowledge: MVC, ASP.NET Core, Entity Framework 6, C#, HTML & CSS, Node.js",
        },
      ],
    },
  ]);
}
