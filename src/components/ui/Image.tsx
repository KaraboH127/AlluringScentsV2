import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string; // path to original image (png/jpg)
  priority?: boolean; // if true, mark as high fetch priority
}

export function Image({ src, alt, className, loading, priority, ...rest }: ImageProps) {
  const ext = src.substring(src.lastIndexOf('.'));
  const base = src.substring(0, src.lastIndexOf('.'));
  const avif = `${base}.avif`;
  const webp = `${base}.webp`;

  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading ?? (priority ? 'eager' : 'lazy')}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        {...rest}
      />
    </picture>
  );
}
