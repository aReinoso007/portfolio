import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { assetPath } from "../lib/assets";

export interface GalleryScreenshot {
  src: string;
  caption: string;
}

interface ScreenshotGalleryProps {
  screenshots: GalleryScreenshot[];
}

const SWIPE_THRESHOLD_PX = 48;

function NavArrow({
  direction,
  onClick,
  disabled,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-surface-raised/90 p-2.5 shadow-md backdrop-blur-sm transition-colors hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      aria-label={direction === "prev" ? "Previous screenshot" : "Next screenshot"}
    >
      <svg className="h-5 w-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {direction === "prev" ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

interface FullscreenViewerProps {
  screenshots: GalleryScreenshot[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function FullscreenViewer({
  screenshots,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: FullscreenViewerProps) {
  const touchStartX = useRef<number | null>(null);
  const active = screenshots[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === screenshots.length - 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && !isFirst) onPrev();
      if (event.key === "ArrowRight" && !isLast) onNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onPrev, onNext, isFirst, isLast]);

  const handleTouchStart = (clientX: number) => {
    touchStartX.current = clientX;
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) return;
    const delta = clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD_PX && !isFirst) onPrev();
    else if (delta < -SWIPE_THRESHOLD_PX && !isLast) onNext();
    touchStartX.current = null;
  };

  if (!active) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-surface/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot fullscreen viewer"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
        <span className="font-mono text-sm text-text-muted" aria-live="polite">
          {activeIndex + 1} / {screenshots.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-surface-raised text-text-muted transition-colors hover:text-text"
          aria-label="Close fullscreen"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-4 sm:px-16"
        onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
      >
        <img
          key={active.src}
          src={assetPath(active.src)}
          alt={active.caption}
          className="max-h-full max-w-full object-contain"
        />

        {!isFirst && (
          <NavArrow
            direction="prev"
            onClick={onPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 sm:left-4"
          />
        )}
        {!isLast && (
          <NavArrow
            direction="next"
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 sm:right-4"
          />
        )}
      </div>

      <div className="shrink-0 border-t border-border bg-surface-raised/80 px-4 py-4 sm:px-6">
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-text sm:text-base">
          {active.caption}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 sm:hidden">
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            className="min-h-11 flex-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-text disabled:opacity-40"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={isLast}
            className="min-h-11 flex-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-text disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const thumbButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = screenshots[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === screenshots.length - 1;

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(screenshots.length - 1, i + 1));
  }, [screenshots.length]);

  const openFullscreen = useCallback(() => setIsFullscreen(true), []);
  const closeFullscreen = useCallback(() => setIsFullscreen(false), []);

  useEffect(() => {
    if (isFullscreen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext, isFullscreen]);

  useEffect(() => {
    const thumb = thumbButtonRefs.current[activeIndex];
    thumb?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  const handleTouchStart = (clientX: number) => {
    touchStartX.current = clientX;
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) return;
    const delta = clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD_PX) goPrev();
    else if (delta < -SWIPE_THRESHOLD_PX) goNext();
    touchStartX.current = null;
  };

  if (!active) return null;

  return (
    <>
      <div className="relative mx-auto w-full max-w-3xl">
        <div
          className="group relative touch-pan-y"
          onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
        >
          <button
            type="button"
            onClick={openFullscreen}
            className="block w-full cursor-zoom-in rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="View screenshot fullscreen"
          >
            <img
              key={active.src}
              src={assetPath(active.src)}
              alt={active.caption}
              loading="lazy"
              draggable={false}
              className="max-h-[min(52vh,280px)] w-full rounded-xl bg-surface-overlay object-contain shadow-lg sm:max-h-[360px] md:max-h-[480px]"
            />
          </button>

          <button
            type="button"
            onClick={openFullscreen}
            className="absolute right-2 top-2 flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-border bg-surface-raised/90 text-text-muted backdrop-blur-sm transition-colors hover:text-text sm:right-3 sm:top-3"
            aria-label="Expand to fullscreen"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>

          {!isFirst && (
            <div
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 sm:block md:left-3"
              onClick={(e) => e.stopPropagation()}
            >
              <NavArrow direction="prev" onClick={goPrev} />
            </div>
          )}

          {!isLast && (
            <div
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 sm:block md:right-3"
              onClick={(e) => e.stopPropagation()}
            >
              <NavArrow direction="next" onClick={goNext} />
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 sm:hidden">
          <button
            type="button"
            onClick={goPrev}
            disabled={isFirst}
            className="min-h-11 flex-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-text transition-colors disabled:cursor-not-allowed disabled:opacity-40 active:bg-surface-overlay"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={openFullscreen}
            className="shrink-0 rounded-lg border border-border bg-surface px-3 py-2.5 text-xs font-medium text-accent"
          >
            Fullscreen
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={isLast}
            className="min-h-11 flex-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-text transition-colors disabled:cursor-not-allowed disabled:opacity-40 active:bg-surface-overlay"
          >
            Next →
          </button>
        </div>

        <p className="mt-2 px-1 text-center text-sm leading-snug italic text-text-subtle">
          {active.caption}
          <button
            type="button"
            onClick={openFullscreen}
            className="mt-1 block w-full text-xs text-accent hover:underline sm:inline sm:mt-0 sm:ml-2 sm:w-auto"
          >
            View fullscreen
          </button>
        </p>

        <div
          className="mt-3 -mx-1 flex gap-2 overflow-x-auto overscroll-x-contain scroll-smooth px-1 pb-2 snap-x snap-mandatory [-webkit-overflow-scrolling:touch]"
          role="tablist"
          aria-label="Screenshot thumbnails"
        >
          {screenshots.map((shot, index) => (
            <button
              key={shot.src}
              ref={(el) => {
                thumbButtonRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              onClick={() => setActiveIndex(index)}
              onDoubleClick={() => {
                setActiveIndex(index);
                openFullscreen();
              }}
              className={`h-14 w-20 shrink-0 snap-center cursor-pointer overflow-hidden rounded-md transition-all active:scale-95 ${
                index === activeIndex
                  ? "opacity-100 ring-2 ring-orange-500 ring-offset-1 ring-offset-surface-raised sm:ring-offset-2"
                  : "opacity-60 active:opacity-90"
              }`}
              aria-label={`View: ${shot.caption}`}
              aria-selected={index === activeIndex}
            >
              <img
                src={assetPath(shot.src)}
                alt=""
                loading="lazy"
                draggable={false}
                className="pointer-events-none h-full w-full object-cover object-top"
              />
            </button>
          ))}
        </div>

        <p className="mt-1 text-center text-xs text-text-subtle sm:hidden">
          Swipe, tap thumbnails, or open fullscreen to browse
        </p>
      </div>

      {isFullscreen && (
        <FullscreenViewer
          screenshots={screenshots}
          activeIndex={activeIndex}
          onClose={closeFullscreen}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
