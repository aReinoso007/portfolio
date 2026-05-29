import { personalInfo } from "../data/cv";
import { ResumeLink } from "./ResumeLink";

function GitHubIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.062 2.062 0 012.063-2.063 2.062 2.062 0 012.063 2.063 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-accent-dim/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-sm text-accent">{personalInfo.title}</p>

        <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          {personalInfo.name.split(" ")[0]}
          <br />
          <span className="text-text-muted">{personalInfo.name.split(" ")[1]}</span>
        </h1>

        <p className="mb-3 text-sm text-text-subtle">{personalInfo.location}</p>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
          {personalInfo.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
          <ResumeLink variant="primary" />
          <a
            href="#projects"
            className="rounded-lg border border-border-subtle px-6 py-3 text-sm font-medium text-text-muted transition-colors hover:border-accent/50 hover:text-text"
          >
            View projects
          </a>
        </div>

        <div className="mt-12 flex items-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle transition-colors hover:text-accent"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-text-subtle transition-colors hover:text-accent"
            aria-label="Email"
          >
            <MailIcon />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-text-subtle"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
