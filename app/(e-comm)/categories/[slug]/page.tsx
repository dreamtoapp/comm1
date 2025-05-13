import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { getCategoryBySlug, getProductsByCategorySlug } from '@/app/dashboard/categories/actions'; // Using existing actions path
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params; // Await params
  const { slug } = resolvedParams;
  const categoryResult = await getCategoryBySlug(slug);

  if (!categoryResult.success || !categoryResult.category) {
    return {
      title: 'Category Not Found',
    };
  }
  const category = categoryResult.category;
  return {
    title: category.name,
    description: category.description || `Browse products in the ${category.name} category.`,
    openGraph: {
      title: category.name,
      description: category.description || `Browse products in the ${category.name} category.`,
      images: category.imageUrl ? [{ url: category.imageUrl, alt: category.name }] : [],
    },
  };
}

const PRODUCTS_PER_PAGE = 12;

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params; // Await params
  const { slug } = resolvedParams;

  const resolvedSearchParams = searchParams ? await searchParams : {}; // Await searchParams if it exists
  const page = typeof resolvedSearchParams?.page === 'string' ? parseInt(resolvedSearchParams.page, 10) : 1;
  const pageSize = PRODUCTS_PER_PAGE;

  const categoryDataResult = await getCategoryBySlug(slug);

  if (!categoryDataResult.success || !categoryDataResult.category) {
    notFound();
  }
  const category = categoryDataResult.category;

  // Fetch products for the current category and page
  // Note: getProductsByCategorySlug in actions.ts currently uses category.id internally after fetching category by slug.
  // This is slightly redundant here as we already have category.id from categoryDataResult.category.id.
  // For simplicity, we'll call it as is. A more optimized action could take categoryId directly.
  const productsResult = await getProductsByCategorySlug(slug, page, pageSize);

  if (!productsResult.success) {
    // Handle error fetching products, maybe show a message
    // For now, we'll proceed, products array will be empty or undefined
    console.error("Error fetching products for category:", productsResult.error);
  }

  const products = productsResult.success ? productsResult.products || [] : [];
  const totalPages = productsResult.success ? productsResult.totalPages || 1 : 1;

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <header className="mb-8 text-center">
        {category.imageUrl && (
          <div className="relative mx-auto mb-4 h-40 w-full max-w-3xl overflow-hidden rounded-lg md:h-60">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {category.description}
          </p>
        )}
      </header>

      <Separator className="my-8" />

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center space-x-4">
              {page > 1 && (
                <Button asChild variant="outline">
                  <Link href={`/categories/${slug}?page=${page - 1}`}>
                    الصفحة السابقة
                  </Link>
                </Button>
              )}
              {page < totalPages && (
                <Button asChild variant="outline">
                  <Link href={`/categories/${slug}?page=${page + 1}`}>
                    الصفحة التالية
                  </Link>
                </Button>
              )}
            </div>
          )}
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            عرض صفحة {page} من {totalPages}
          </div>
        </>
      ) : (
        <div className="py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            لا توجد منتجات في هذا الصنف حاليًا.
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            يرجى التحقق مرة أخرى لاحقًا أو استكشاف أصناف أخرى.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">العودة إلى الصفحة الرئيسية</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
