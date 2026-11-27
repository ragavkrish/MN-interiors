import { useEffect, useRef, useState } from 'react';
import { Camera } from '@phosphor-icons/react';
import type { ProjectImage } from '../data/content';

interface ProjectPhotoProps {
  image: ProjectImage;
  /** Responsive `sizes` hint, e.g. "(max-width: 680px) 100vw, 33vw" */
  sizes: string;
  fit?: 'cover' | 'contain';
  /** Load immediately with high priority (hero photo only) */
  priority?: boolean;
  /** Placeholder style: 'full' = icon + label, 'icon' = icon only (tiles with their own caption), 'compact' = small icon (thumbnails) */
  placeholder?: 'full' | 'icon' | 'compact';
  className?: string;
}

/**
 * A project photo that never shifts layout and never pops in:
 * a tiny blurred preview fills the frame, and the real photo (AVIF/WebP/JPEG at the
 * right width) fades in over it once loaded. Frames without a photo render a
 * labelled placeholder so the shot list stays visible until real photos arrive.
 */
export function ProjectPhoto({
  image,
  sizes,
  fit = 'cover',
  priority = false,
  placeholder = 'full',
  className = '',
}: ProjectPhotoProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // A cached photo can finish loading before React attaches onLoad.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setLoaded(true);
  }, []);

  if (!image.photo) {
    return (
      <div
        className={`project-placeholder relative flex h-full w-full flex-col items-center gap-2 p-4 text-center ${
          placeholder === 'icon' ? 'justify-start pt-[22%]' : 'justify-center'
        } ${className}`}
        role="img"
        aria-label={image.alt}
      >
        <Camera
          size={placeholder === 'compact' ? 16 : 30}
          weight="duotone"
          className="text-white/35"
          aria-hidden="true"
        />
        {placeholder === 'full' && (
          <>
            <p className="text-[11px] font-bold tracking-[0.16em] text-white/45 uppercase">
              Photo coming soon
            </p>
            <p className="max-w-[240px] text-[12.5px] leading-[1.4] text-white/35">{image.shot}</p>
          </>
        )}
      </div>
    );
  }

  const { picture, blur } = image.photo;
  const fitClass = fit === 'cover' ? 'object-cover' : 'object-contain';

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Blurred preview — only for cover crops; a contained photo sits on black */}
      {fit === 'cover' && (
        <img
          src={blur}
          alt=""
          aria-hidden="true"
          className={`photo-blur absolute inset-0 h-full w-full object-cover ${loaded ? 'is-hidden' : ''}`}
        />
      )}
      <picture>
        {picture.sources.avif && <source type="image/avif" srcSet={picture.sources.avif} sizes={sizes} />}
        {picture.sources.webp && <source type="image/webp" srcSet={picture.sources.webp} sizes={sizes} />}
        <img
          ref={imgRef}
          src={picture.img.src}
          srcSet={picture.sources.jpeg}
          sizes={sizes}
          width={picture.img.w}
          height={picture.img.h}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          draggable={false}
          onLoad={() => setLoaded(true)}
          className={`photo-main relative h-full w-full ${fitClass} ${loaded ? 'is-loaded' : ''}`}
        />
      </picture>
    </div>
  );
}
