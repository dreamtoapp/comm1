import { StaticImageData } from 'next/image';

export interface CarouselImage {
  id: string;
  src: string | StaticImageData; // Use 'src' for consistency with next/image
  alt: string;
  width?: number;
  height?: number;
}
