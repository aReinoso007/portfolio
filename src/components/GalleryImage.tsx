import { useEffect, useRef, useState } from "react";
import { assetPath } from "../lib/assets";

interface FadeImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function FadeImage({ src, alt, className = "", containerClassName = "" }: FadeImageProps) {
  const [displaySrc, setDisplaySrc] = useState(src);
  const [visible, setVisible] = useState(true);
  const pendingSrc = useRef(src);

  useEffect(() => {
    if (src === displaySrc) return;

    pendingSrc.current = src;
    const url = assetPath(src);
    const img = new Image();
    img.src = url;

    const swap = () => {
      if (pendingSrc.current !== src) return;
      setVisible(false);
      window.setTimeout(() => {
        setDisplaySrc(src);
        setVisible(true);
      }, 80);
    };

    if (img.complete) swap();
    else img.onload = swap;
  }, [src, displaySrc]);

  return (
    <div className={`relative flex items-center justify-center ${containerClassName}`}>
      <img
        src={assetPath(displaySrc)}
        alt={alt}
        decoding="async"
        draggable={false}
        className={`transition-opacity duration-150 ease-out ${visible ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  );
}

export function usePreloadGalleryImages(sources: string[], activeIndex: number) {
  useEffect(() => {
    const preload = (src: string) => {
      const img = new Image();
      img.src = assetPath(src);
    };

    sources.forEach(preload);
  }, [sources]);

  useEffect(() => {
    const neighbors = [activeIndex - 1, activeIndex, activeIndex + 1];
    neighbors.forEach((index) => {
      if (index >= 0 && index < sources.length) {
        const img = new Image();
        img.src = assetPath(sources[index]);
      }
    });
  }, [activeIndex, sources]);
}
