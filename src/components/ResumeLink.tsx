import type { MouseEvent } from "react";
import { resumeDownload } from "../data/cv";
import { assetPath } from "../lib/assets";
import { appHref, navigate, RESUME_ROUTE } from "../lib/routing";

interface ResumeLinkProps {
  variant?: "primary" | "secondary";
  className?: string;
}

function openResume(event: MouseEvent<HTMLAnchorElement>) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    return;
  }
  event.preventDefault();
  navigate(RESUME_ROUTE);
}

export function ResumeLink({ variant = "primary", className = "" }: ResumeLinkProps) {
  const downloadHref = assetPath(resumeDownload.file);
  const viewHref = appHref(RESUME_ROUTE);

  if (variant === "primary") {
    return (
      <>
        <a
          href={viewHref}
          onClick={openResume}
          className={`rounded-lg border border-border-subtle px-6 py-3 text-sm font-medium text-text-muted transition-colors hover:border-accent/50 hover:text-text ${className}`}
        >
          View Resume
        </a>
        <a
          href={downloadHref}
          download={resumeDownload.filename}
          className={`rounded-lg border border-border-subtle px-6 py-3 text-sm font-medium text-text-muted transition-colors hover:border-accent/50 hover:text-text ${className}`}
        >
          Download Resume ↓
        </a>
      </>
    );
  }

  return (
    <span className={`inline-flex items-center gap-4 ${className}`}>
      <a
        href={viewHref}
        onClick={openResume}
        className="text-sm text-text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
      >
        View Resume
      </a>
      <a
        href={downloadHref}
        download={resumeDownload.filename}
        className="text-sm text-text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
      >
        Download Resume
      </a>
    </span>
  );
}
