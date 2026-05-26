import { personalInfo } from "../data/cv";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-sm text-text-subtle">
          © {year} {personalInfo.name}
        </p>
        <p className="text-sm text-text-subtle">
          Built with React, TypeScript & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
