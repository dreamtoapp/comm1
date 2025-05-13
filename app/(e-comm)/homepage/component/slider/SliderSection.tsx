import React from 'react';

import ServerCarousel from '../../../components/ui/ServerCarousel';

interface Offer {
  id: string;
  title: string;
  imageUrl: string | null;
}

interface OfferSliderProps {
  offers: Offer[];
}

const SliderSection: React.FC<OfferSliderProps> = ({ offers }) => {
  // Transform offers to the format expected by ServerCarousel
  const carouselImages = offers.map((offer) => ({
    id: offer.id,
    url: offer.imageUrl || '/fallback/fallback.avif',
    alt: offer.title,
  }));

  // If no offers, don't render the section
  if (!offers || offers.length === 0) {
    return null;
  }

  return (
    <section className='relative px-4 py-8'>
      <div className='container mx-auto max-w-full'>
        <ServerCarousel images={carouselImages} className='overflow-hidden rounded-xl shadow-lg' />
      </div>
    </section>
  );
};

export default SliderSection;
