import { personalInfo } from "../data/cv";
import { ResumeLink } from "./ResumeLink";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-mono text-sm text-text-subtle">© 2026 {personalInfo.name}</p>

        <div className="flex items-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <ResumeLink variant="secondary" />
        </div>

        <p className="text-xs text-text-subtle">Made with React + TypeScript</p>
      </div>
    </footer>
  );
}
