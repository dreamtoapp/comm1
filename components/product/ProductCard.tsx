'use client';

import { useState } from 'react';

import Image from 'next/image';

import RatingPreview from '@/components/rating/RatingPreview';
import { Badge } from '@/components/ui/badge';
import WishlistButton from '@/components/wishlist/WishlistButton';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product'; // Import shared Product type

import Link from '../link';

// Remove local Product interface definition
// interface Product { ... }

interface ProductCardProps {
  product: Product; // Use imported shared Product type
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.imageUrl || '/fallback/product-fallback.avif');

  // Format price
  const formattedPrice = new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
  }).format(product.price);

  // Remove salePrice related logic as it's not in the Product type
  // const formattedSalePrice = ...
  // const discountPercentage = ...

  // We'll use the RatingPreview component instead of custom rendering

  return (
    <div className={cn('group relative', className)}>
      {/* Wishlist button */}
      <div className='absolute left-3 top-3 z-10'>
        <WishlistButton productId={product.id} size='sm' showBackground={true} />
      </div>

      {/* Product link */}
      <Link href={`/product/${product.slug || product.id}`} className='block'>
        <div className='relative aspect-square overflow-hidden rounded-lg bg-muted'>
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            onError={() => setImgSrc('/fallback/product-fallback.avif')}
          />

          {/* Remove Sale badge */}
          {/* {product.salePrice && ( ... )} */}

          {/* Stock badge */}
          {!product.inStock && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
              <Badge variant='outline' className='bg-white px-3 py-1 font-bold text-black'>
                غير متوفر
              </Badge>
            </div>
          )}
        </div>

        <div className='mt-3 space-y-1'>
          {/* Product name */}
          <h3 className='line-clamp-1 text-sm font-medium'>{product.name}</h3>

          {/* Rating */}
          {product.rating && product.rating > 0 && (
            <RatingPreview
              productId={product.id}
              productSlug={product.slug}
              rating={product.rating}
              reviewCount={product.reviewCount || 0}
              size='sm'
              disableLink={true}
            />
          )}

          {/* Price */}
          <div className='flex items-center gap-2'>
            {/* Always show regular price */}
            <span className='text-sm font-bold'>{formattedPrice}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
