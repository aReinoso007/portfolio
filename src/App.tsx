import { lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const Projects = lazy(() =>
  import("./components/Projects").then((m) => ({ default: m.Projects })),
);

function ProjectsFallback() {
  return <div className="min-h-[400px]" aria-hidden="true" />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Suspense fallback={<ProjectsFallback />}>
          <Projects />
        </Suspense>
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
