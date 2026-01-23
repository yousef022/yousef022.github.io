import { HashRouter, Routes, Route } from "react-router-dom";
import AppShell from "./layout/AppShell";

import Home from "../pages/Home/Home";
import Projects from "../pages/Projects/Projects";
import Project from "../pages/Project/Project";
import Now from "../pages/Now/Now";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<Project />} />
        <Route path="/now" element={<Now />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default AppRoutes;
