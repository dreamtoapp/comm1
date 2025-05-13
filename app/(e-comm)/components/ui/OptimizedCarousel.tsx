'use client';

import 'react-multi-carousel/lib/styles.css';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';

// Define responsive breakpoints
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
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

interface CarouselImage {
  id: string;
  url: string;
  alt: string;
}

interface OptimizedCarouselProps {
  images: CarouselImage[];
  deviceType?: string;
  aspectRatio?: number; // height/width ratio, default 9/16 (56.25%)
  className?: string;
}

export default function OptimizedCarousel({
  images,
  deviceType,
  aspectRatio = 0.5625, // 9/16 ratio by default
  className = '',
}: OptimizedCarouselProps) {
  // Use state to track when carousel is fully loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Mark as loaded after component mounts
  useEffect(() => {
    // If there are no images, mark as loaded to hide skeleton
    if (!images || images.length === 0) {
      setIsLoaded(true);
      return;
    }

    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [images]);

  // If no images, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className={`relative mx-auto w-full ${className}`}>
        <div className='relative h-0 w-full' style={{ paddingBottom: `${aspectRatio * 100}%` }}>
          <div className='absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gray-100 shadow-lg'>
            <p className='text-gray-500'>No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative mx-auto w-full ${className}`}>
      {/* Reserve space for the carousel to prevent layout shift */}
      <div className='relative h-0 w-full' style={{ paddingBottom: `${aspectRatio * 100}%` }}>
        <div
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <Carousel
            ssr
            deviceType={deviceType}
            responsive={responsive}
            infinite={images.length > 1}
            autoPlay={deviceType !== 'mobile' && images.length > 1}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass='carousel-container'
            removeArrowOnDeviceType={['tablet', 'mobile']}
            dotListClass='custom-dot-list-style'
            itemClass='carousel-item'
            showDots={images.length > 1}
            arrows={images.length > 1}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className='relative h-full w-full overflow-hidden rounded-xl shadow-lg'
              >
                {/* Use a regular img tag with a background color for better fallback */}
                <div className='absolute inset-0 bg-gray-200'></div>

                {/* Next.js Image with proper error handling */}
                <Image
                  src={image.url}
                  alt={image.alt || 'Carousel image'}
                  fill
                  className='z-10 object-cover object-center'
                  sizes='100vw'
                  quality={85}
                  priority={index === 0} // Only prioritize the first image
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    // Fallback to a local placeholder image if the original image fails to load
                    const imgElement = e.currentTarget as HTMLImageElement;
                    imgElement.src = '/fallback/fallback.avif';
                  }}
                />

                {/* Overlay with text */}
                <div className='absolute inset-0 z-20 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4'>
                  <h3 className='text-lg font-semibold text-white'>
                    {image.alt || 'Promotional offer'}
                  </h3>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        {/* Show a loading state while the carousel is initializing */}
        {!isLoaded && (
          <div className='absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg'>
            <div className='absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300'></div>
          </div>
        )}
      </div>
    </div>
  );
}
