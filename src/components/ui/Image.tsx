import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  priority?: boolean;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, className, loading, priority, ...rest }, ref) => {
    const base = src.substring(0, src.lastIndexOf('.'));
    const avif = `${base}.avif`;
    const webp = `${base}.webp`;

    return (
      <picture>
        <source srcSet={avif} type="image/avif" />
        <source srcSet={webp} type="image/webp" />
        <img
          ref={ref}
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
);

Image.displayName = "Image";