import React from "react";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Professional from "../components/Professional.jsx";
import Projects from "../components/Projects.jsx";
import Research from "../components/Research.jsx";
import Documents from "../components/Documents.jsx";

export default function Home() {
  return (
    <div className="space-y-24">
      <Hero id="top" />
      <About id="about" />
      <Professional id="professional" />
      <Projects id="projects" />
      <Research id="research" />
      <Documents id="documents" />
    </div>
  );
}
