import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Software Developement Intern",
    location: "PPOk",
    description:
      "I interned as a full stack developer learning much about the .NET framework and SQL, while also going to college full time.",
    icon: React.createElement(LuGraduationCap),
    date: "2014-2018",
  },
  {
    title: "Software Developer I",
    location: "PPOk",
    description:
      "I was hired on as a full-time full-stack developer. I worked on a variety of projects and greatly improved my skills in the .NET framework and SQL.",
    icon: React.createElement(LuGraduationCap),
    date: "2018-2020",
  },
  {
    title: "Software Developer II",
    location: "PPOk",
    description:
      "I was promoted to Software Developer II. I continued to work on a variety of projects and was given more responsibility. I also began to learn more about the front-end and JavaScript.",
    icon: React.createElement(CgWorkAlt),
    date: "2020 - 2022",
  },
  {
    title: "Software Engineer",
    location: "AlignRx",
    description:
      "I moved to AlignRx where I continued to work with the .NET framework and SQL as well as helping with a company migration.",
    icon: React.createElement(FaReact),
    date: "2022 - 2023",
  },
  {
    title: "Senior Software Engineer",
    location: "AlignRx",
    description:
      "I am now a Senior Software Engineer at AlignRx. I am currently working to update our stack to use more modern technologies.",
    icon: React.createElement(FaReact),
    date: "2023 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Project 1",
    description:
      "This is a project description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "SQL"],
    imageUrl: corpcommentImg,
  },
  {
    title: "Project 2",
    description:
      "This is a project description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "SQL"],
    imageUrl: rmtdevImg,
  },
  {
    title: "Project 3",
    description:
      "This is a project description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "C#",
  "ASP.NET",
  ".NET Core",
  "WPF",
  "T-SQL",
  "JQuery",
  "Vue",
  "React",
  "Angular",
  "Git",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Next.js",
  "Node.js",
  "Tailwind",
  "Bootstrap",
  "Framer Motion",
] as const;
