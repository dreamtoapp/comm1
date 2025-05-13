'use client';

import 'react-multi-carousel/lib/styles.css';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import Image from 'next/image'; // Removed unused StaticImageData import
import { CarouselImage } from '@/types/carouselTypes'; // Import shared type

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Remove local definition
// interface CarouselImage {
//   id: string;
//   src: string | StaticImageData;
//   alt: string;
//   width?: number;
//   height?: number;
// }

interface SimpleCarouselProps {
  images: CarouselImage[]; // Use imported type
  deviceType?: string;
  className?: string;
}

interface ImageWithFallbackProps extends React.ComponentProps<typeof Image> {
  fallbackSrc: string;
}

const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc,
  ...props
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      className="object-cover"
      placeholder={typeof src === 'string' && src.startsWith('/') ? 'blur' : 'empty'}
      blurDataURL={typeof src === 'string' && src.startsWith('/') ? src : undefined}
    />
  );
};

export default function SimpleCarousel({
  images,
  deviceType,
  className = '',
}: SimpleCarouselProps) {
  if (!images?.length) {
    return (
      <div className={`relative h-64 w-full ${className}`}>
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <Carousel
        ssr
        deviceType={deviceType}
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        aria-label="Image carousel"
      >
        {images.map((image, index) => (
          <div key={image.id} className="relative aspect-video h-[400px] w-full">
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              width={image.width || 1600}
              height={image.height || 900}
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={index === 0}
              quality={80}
              loading={index === 0 ? 'eager' : 'lazy'}
              fallbackSrc="/fallback/fallback.avif"
            />
            {image.alt && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                <h3 className="text-xl font-semibold">{image.alt}</h3>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
