import { resumeDownload } from "../data/cv";
import { assetPath } from "../lib/assets";

interface ResumeLinkProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export function ResumeLink({ variant = "primary", className = "" }: ResumeLinkProps) {
  const href = assetPath(resumeDownload.file);

  if (variant === "primary") {
    return (
      <a
        href={href}
        download={resumeDownload.filename}
        className={`rounded-lg border border-border-subtle px-6 py-3 text-sm font-medium text-text-muted transition-colors hover:border-accent/50 hover:text-text ${className}`}
      >
        Download Resume ↓
      </a>
    );
  }

  return (
    <a
      href={href}
      download={resumeDownload.filename}
      className={`text-sm text-text-muted underline-offset-4 transition-colors hover:text-accent hover:underline ${className}`}
    >
      Download Resume
    </a>
  );
}
