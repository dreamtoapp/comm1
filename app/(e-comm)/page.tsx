import dynamic from 'next/dynamic';

import { auth } from '@/auth';

import { generatePageMetadata } from '../../lib/seo-utils';
import { getPromotions } from './homepage/actions/getPromotions';
import { fetchSuppliersWithProducts } from './homepage/actions/getSuppliersWithProducts';

// Dynamically import components with optimized loading strategies
// Critical above-the-fold components with priority
const SliderSection = dynamic(() => import('./homepage/component/slider/SliderSection'), {
  ssr: true,
  loading: () => <div className='h-64 w-full animate-pulse rounded-xl bg-gray-100 shadow-md'></div>,
});

const PreloadScript = dynamic(() => import('./homepage/component/PreloadScript'), {
  ssr: true,
});

// Non-critical components that can be loaded after initial render
const CategoryListClient = dynamic(
  () => import('./components/EcommClientWrappers').then((mod) => mod.CategoryListClient),
  {
    ssr: true,
    loading: () => (
      <div className='w-full animate-pulse rounded-xl border border-border bg-card p-4'>
        <div className='mb-4 h-8 w-1/3 rounded bg-gray-200'></div>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='h-32 rounded bg-gray-200'></div>
          ))}
        </div>
      </div>
    ),
  },
);

const CheckUserActivationClient = dynamic(
  () => import('./components/EcommClientWrappers').then((mod) => mod.CheckUserActivationClient),
  {
    ssr: true, // Not needed for SSR
  },
);

const CheckUserLocationClient = dynamic(
  () => import('./components/EcommClientWrappers').then((mod) => mod.CheckUserLocationClient),
  {
    ssr: true, // Not needed for SSR
  },
);

const ClearButton = dynamic(() => import('./homepage/component/category/ClearButton'), {
  ssr: true,
  loading: () => <div className='h-12 w-full animate-pulse rounded-xl bg-card'></div>,
});

// Use dynamic imports with optimized component for product section
const ProductsSection = dynamic(() => import('./homepage/component/product/ProductsSection'), {
  ssr: true,
  loading: () => (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className='relative h-80 animate-pulse overflow-hidden rounded-2xl border-border bg-card shadow-md'
          >
            <div className='h-40 bg-gray-300'></div>
            <div className='space-y-4 p-4'>
              <div className='h-4 w-3/4 rounded bg-gray-300'></div>
              <div className='h-4 w-1/2 rounded bg-gray-300'></div>
              <div className='h-8 rounded bg-gray-300'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});

// Generate metadata dynamically
export async function generateMetadata() {
  return generatePageMetadata('ecomm');
}

export default async function Page({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  const { slug } = await searchParams;
  const session = await auth();

  // Fetch data in parallel
  const [supplierWithItems, promotions] = await Promise.all([
    fetchSuppliersWithProducts(),
    getPromotions(),
  ]);

  // Use promotions if available, otherwise use fallback data
  // This is optimized to avoid unnecessary object creation if promotions exist
  const displayPromotions =
    promotions.length > 0
      ? promotions
      : [
        {
          id: 'fallback-1',
          title: 'Special Summer Collection',
          imageUrl: '/fallback/fallback.avif', // Local image for reliable testing
        },
        {
          id: 'fallback-2',
          title: 'New Arrivals - Spring 2025',
          imageUrl: '/fallback/fallback.webp', // Local image for reliable testing
        },
      ];

  return (
    <div className='container mx-auto flex flex-col gap-4 bg-background text-foreground'>
      {/* Add performance optimization script */}
      <PreloadScript />

      {/* User-specific components loaded only when needed */}
      {session && (
        <>
          <CheckUserActivationClient user={session.user} />
          <CheckUserLocationClient user={session.user} />
        </>
      )}

      {/* Critical above-the-fold content */}
      <SliderSection offers={displayPromotions} />

      {/* Filter button - only shown when needed */}
      <ClearButton slugString={slug} />
      <CategoryListClient
        suppliers={supplierWithItems.companyData}
        cardDescription={
          supplierWithItems.companyData.length > 0
            ? 'اكتشف المنتجات من الموردين الموثوقة وتمتع بأفضل الخيارات المتاحة'
            : 'لا توجد شركات متاحة حالياً'
        }
        cardHeader={
          supplierWithItems.companyData.length > 0 ? 'قائمة الموردين المميزة' : 'الموردين غير متوفرة'
        }
      />
      {supplierWithItems.offerData && supplierWithItems.offerData.length > 0 ? (
        <CategoryListClient
          suppliers={supplierWithItems.offerData}
          cardDescription='استمتع بأفضل العروض والخصومات على المنتجات المختارة'
          cardHeader='قائمة العروض الحصرية'
        />
      ) : (
        <CategoryListClient
          suppliers={[]}
          cardDescription='لا توجد عروض متاحة حالياً'
          cardHeader='العروض غير متوفرة'
        />
      )}
      <ProductsSection slug={slug || ''} />
    </div>
  );
}
