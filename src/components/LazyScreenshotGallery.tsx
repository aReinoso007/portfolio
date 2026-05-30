import type { GalleryScreenshot } from "./ScreenshotGallery";
import { ScreenshotGallery } from "./ScreenshotGallery";
import { useInView } from "../hooks/useInView";

interface LazyScreenshotGalleryProps {
  screenshots: GalleryScreenshot[];
}

export function LazyScreenshotGallery({ screenshots }: LazyScreenshotGalleryProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    rootMargin: "120px 0px",
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="min-h-[320px] sm:min-h-[400px]">
      {isInView ? (
        <ScreenshotGallery screenshots={screenshots} />
      ) : (
        <div
          className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-border bg-surface-overlay sm:h-[360px] md:h-[400px]"
          aria-hidden="true"
        >
          <span className="text-sm text-text-subtle">Loading gallery…</span>
        </div>
      )}
    </div>
  );
}
