'use client';
import {
  useEffect,
  useState,
} from 'react';

import { ShoppingCart } from 'lucide-react'; // Import directly

import Link from '@/components/link';
import { iconVariants } from '@/lib/utils'; // Correct import path for CVA variants
import { useCartStore } from '@/store/cartStore';

export default function CartIcon() {
  const { getTotalUniqueItems } = useCartStore();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className='relative'>
      <Link
        href='/cart'
        aria-label='عرض السلة'
        className='relative flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 transition-all duration-300 hover:scale-105 hover:bg-primary/20' // Changed py-1 to py-2
      >
        <ShoppingCart // Use direct import + CVA
          className={iconVariants({ size: 'sm', variant: 'primary' })}
          aria-label='عرض السلة'
        />

        {mounted && getTotalUniqueItems() > 0 && (
          <span className='absolute -right-2 -top-2 flex h-4 w-4 animate-bounce items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white shadow-md'>
            {getTotalUniqueItems()}
          </span>
        )}
      </Link>
    </div>
  );
}
