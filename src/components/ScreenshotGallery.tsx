import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { assetPath } from "../lib/assets";
import { FadeImage, usePreloadAdjacentImages } from "./GalleryImage";

const THUMB_LOAD_RADIUS = 4;

export interface GalleryScreenshot {
  src: string;
  caption: string;
}

interface ScreenshotGalleryProps {
  screenshots: GalleryScreenshot[];
}

const SWIPE_THRESHOLD_PX = 48;

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

function scrollThumbIntoView(strip: HTMLDivElement, thumb: HTMLButtonElement) {
  const thumbLeft = thumb.offsetLeft;
  const thumbWidth = thumb.offsetWidth;
  const stripWidth = strip.clientWidth;
  const scrollLeft = strip.scrollLeft;
  const thumbRight = thumbLeft + thumbWidth;

  if (thumbLeft >= scrollLeft && thumbRight <= scrollLeft + stripWidth) {
    return;
  }

  const target = thumbLeft - stripWidth / 2 + thumbWidth / 2;
  strip.scrollTo({
    left: Math.max(0, target),
    behavior: "auto",
  });
}

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
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
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
  const touchStartY = useRef<number | null>(null);
  const savedScrollY = useRef(0);
  const active = screenshots[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === screenshots.length - 1;

  useEffect(() => {
    savedScrollY.current = lockBodyScroll();
    return () => unlockBodyScroll(savedScrollY.current);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && !isFirst) onPrev();
      if (event.key === "ArrowRight" && !isLast) onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext, isFirst, isLast]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD_PX) {
      if (deltaX > 0 && !isFirst) onPrev();
      else if (deltaX < 0 && !isLast) onNext();
    }

    touchStartX.current = null;
    touchStartY.current = null;
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
        <span className="font-mono text-sm text-text-muted">
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
        className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-2 py-4 sm:px-16"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <FadeImage
          src={active.src}
          alt={active.caption}
          className="max-h-full max-w-full object-contain"
          containerClassName="h-full w-full"
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
        <p className="mx-auto min-h-[3rem] max-w-3xl text-center text-sm leading-relaxed text-text sm:min-h-[2.5rem] sm:text-base">
          {active.caption}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 sm:hidden">
          <button
            type="button"
            onClick={(e) => {
              onPrev();
              e.currentTarget.blur();
            }}
            disabled={isFirst}
            className="min-h-11 flex-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-text disabled:opacity-40"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={(e) => {
              onNext();
              e.currentTarget.blur();
            }}
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
  const touchStartY = useRef<number | null>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const thumbButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isInitialMount = useRef(true);

  const active = screenshots[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === screenshots.length - 1;
  const imageSources = screenshots.map((s) => s.src);

  usePreloadAdjacentImages(imageSources, activeIndex, true);

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
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const strip = thumbStripRef.current;
    const thumb = thumbButtonRefs.current[activeIndex];
    if (!strip || !thumb) return;

    scrollThumbIntoView(strip, thumb);
  }, [activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD_PX) {
      if (deltaX > 0) goPrev();
      else goNext();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!active) return null;

  return (
    <>
      <div className="relative mx-auto w-full max-w-3xl [contain:layout]">
        <div
          className="group relative touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={openFullscreen}
            className="flex h-[280px] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-xl bg-surface-overlay focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-[360px] md:h-[480px]"
            aria-label="View screenshot fullscreen"
          >
            <FadeImage
              src={active.src}
              alt={active.caption}
              eager
              className="max-h-full max-w-full object-contain"
              containerClassName="h-full w-full"
            />
          </button>

          <button
            type="button"
            onClick={(e) => {
              openFullscreen();
              e.currentTarget.blur();
            }}
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

        <div className="mt-3 flex h-11 items-center justify-between gap-2 sm:hidden">
          <button
            type="button"
            onClick={(e) => {
              goPrev();
              e.currentTarget.blur();
            }}
            disabled={isFirst}
            className="min-h-11 flex-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-text transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={(e) => {
              openFullscreen();
              e.currentTarget.blur();
            }}
            className="shrink-0 rounded-lg border border-border bg-surface px-3 py-2.5 text-xs font-medium text-accent"
          >
            Fullscreen
          </button>
          <button
            type="button"
            onClick={(e) => {
              goNext();
              e.currentTarget.blur();
            }}
            disabled={isLast}
            className="min-h-11 flex-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-text transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <div className="mt-2 min-h-[4.5rem] px-1 text-center sm:min-h-[3rem]">
          <p className="text-sm leading-snug italic text-text-subtle">{active.caption}</p>
          <button
            type="button"
            onClick={(e) => {
              openFullscreen();
              e.currentTarget.blur();
            }}
            className="mt-1 text-xs text-accent hover:underline"
          >
            View fullscreen
          </button>
        </div>

        <div
          ref={thumbStripRef}
          className="mt-3 flex h-[3.75rem] touch-pan-x gap-2 overflow-x-auto overscroll-x-contain px-1 [-webkit-overflow-scrolling:touch]"
          role="tablist"
          aria-label="Screenshot thumbnails"
        >
          {screenshots.map((shot, index) => {
            const loadThumb = Math.abs(index - activeIndex) <= THUMB_LOAD_RADIUS;

            return (
              <button
                key={shot.src}
                ref={(el) => {
                  thumbButtonRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                onClick={(e) => {
                  setActiveIndex(index);
                  e.currentTarget.blur();
                }}
                className={`h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 bg-surface-overlay ${
                  index === activeIndex
                    ? "border-orange-500 opacity-100"
                    : "border-transparent opacity-60"
                }`}
                aria-label={`View: ${shot.caption}`}
                aria-selected={index === activeIndex}
              >
                {loadThumb ? (
                  <img
                    src={assetPath(shot.src)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="pointer-events-none h-full w-full object-cover object-top"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <p className="mt-1 h-4 text-center text-xs text-text-subtle sm:hidden">
          Swipe, tap thumbnails, or open fullscreen
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
