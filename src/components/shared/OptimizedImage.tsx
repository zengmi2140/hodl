import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // 将图片路径转换为 WebP 格式
  const getWebPPath = (path: string) => {
    if (path.startsWith('http') || path.startsWith('data:')) {
      return path;
    }
    const lastDot = path.lastIndexOf('.');
    if (lastDot === -1) return path;
    return path.substring(0, lastDot) + '.webp';
  };

  const webpSrc = getWebPPath(src);
  const fallbackSrc = src;

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        style={{
          backgroundColor: imageLoaded ? 'transparent' : '#f3f4f6',
          opacity: imageLoaded ? 1 : 0.7,
          transition: 'opacity 0.2s ease-in-out',
        }}
      />
    </picture>
  );
};

export default OptimizedImage;

