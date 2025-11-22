import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import PCBBackground from "./components/PCBAnimation.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ResearchPage from "./pages/ResearchPage";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="text-slate-100 relative">
        <PCBBackground />
        <Navbar />

        <main className="max-w-5xl mx-auto pt-24 pb-24 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/research" element={<ResearchPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
