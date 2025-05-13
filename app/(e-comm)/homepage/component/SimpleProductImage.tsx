'use client';

import { useState } from 'react';
import Image from 'next/image'; // Import next/image

interface SimpleProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SimpleProductImage({ src, alt, className = '' }: SimpleProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
          <span className='text-sm text-gray-500'>No Image</span>
        </div>
      )}

      {!hasError && ( // Only render Image if no error
        <Image
          src={imgSrc}
          alt={alt}
          fill // Use fill for responsive sizing
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes, adjust as needed
          className={'object-cover'} // Removed loading class
          quality={75} // Default quality
          // placeholder="blur" // Optional: add blur placeholder
          // blurDataURL={/* Base64 encoded small image */}
          onError={() => {
            if (imgSrc !== '/fallback/product-fallback.avif') {
              setImgSrc('/fallback/product-fallback.avif');
            } else {
              setHasError(true);
            }
          }}
        />
      )}
    </div>
  );
}
