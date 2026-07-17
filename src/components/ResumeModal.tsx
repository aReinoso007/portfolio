import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { resumeDownload } from "../data/cv";
import { assetPath } from "../lib/assets";

interface ResumeModalProps {
  onClose: () => void;
}

function lockBodyScroll() {
  const scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  return scrollY;
}

function unlockBodyScroll(scrollY: number) {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  window.scrollTo(0, scrollY);
}

export function ResumeModal({ onClose }: ResumeModalProps) {
  const savedScrollY = useRef(0);
  const src = assetPath(resumeDownload.file);

  useEffect(() => {
    savedScrollY.current = lockBodyScroll();
    return () => unlockBodyScroll(savedScrollY.current);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex flex-col bg-surface/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Resume viewer"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
        <span className="truncate font-mono text-sm text-text-muted">Resume</span>

        <div className="flex items-center gap-2">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-lg border border-border bg-surface-raised px-4 text-sm font-medium text-text-muted transition-colors hover:text-text sm:inline-flex"
          >
            Open in new tab ↗
          </a>
          <a
            href={src}
            download={resumeDownload.filename}
            className="inline-flex min-h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            Download ↓
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-surface-raised text-text-muted transition-colors hover:text-text"
            aria-label="Close resume viewer"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 p-2 sm:p-4">
        <object
          data={src}
          type="application/pdf"
          className="h-full w-full rounded-lg bg-surface-overlay"
          aria-label="Resume PDF"
        >
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="max-w-md text-sm leading-relaxed text-text-muted">
              Your browser can't display PDFs inline. You can open the resume in a
              new tab or download it instead.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
              >
                Open in new tab ↗
              </a>
              <a
                href={src}
                download={resumeDownload.filename}
                className="rounded-lg border border-border-subtle px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:border-accent/50 hover:text-text"
              >
                Download ↓
              </a>
            </div>
          </div>
        </object>
      </div>
    </div>,
    document.body,
  );
}
