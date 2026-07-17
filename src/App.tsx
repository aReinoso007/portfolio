import { lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { usePathname } from "./hooks/usePathname";
import { isResumeRoute, navigate } from "./lib/routing";

const Projects = lazy(() =>
  import("./components/Projects").then((m) => ({ default: m.Projects })),
);

const ResumeModal = lazy(() =>
  import("./components/ResumeModal").then((m) => ({ default: m.ResumeModal })),
);

function ProjectsFallback() {
  return <div className="min-h-[400px]" aria-hidden="true" />;
}

export default function App() {
  const pathname = usePathname();
  const showResume = isResumeRoute(pathname);

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

      {showResume && (
        <Suspense fallback={null}>
          <ResumeModal onClose={() => navigate("/", { replace: true })} />
        </Suspense>
      )}
    </>
  );
}
