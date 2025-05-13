'use server';

import { Prisma } from '@prisma/client'; // Import Prisma
import db from '@/lib/prisma';
import { Product } from '@/types/product';

/**
 * Server action to fetch a page of products with pagination
 *
 * @param slug - Category slug to filter products (optional)
 * @param page - Page number (starting from 1)
 * @param pageSize - Number of items per page
 * @returns Object containing products array and hasMore flag
 */
export async function fetchProductsPage(
  slug: string = '',
  page: number = 1,
  pageSize: number = 8,
): Promise<{ products: Product[]; hasMore: boolean }> {
  try {
    // Calculate how many items to skip
    const skip = (page - 1) * pageSize;

    // Find supplier if slug is provided
    const whereClause: Prisma.ProductWhereInput = { published: true }; // Use const

    if (slug && slug.trim() !== '') {
      const supplier = await db.supplier.findFirst({
        where: { slug },
        select: { id: true },
      });

      if (supplier) {
        whereClause.supplierId = supplier.id;
      }
    }

    // Request one extra item to determine if there are more pages
    const products = await db.product.findMany({
      where: whereClause,
      skip,
      take: pageSize + 1, // Request one extra to check if there are more
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        details: true,
        size: true,
        published: true,
        outOfStock: true,
        imageUrl: true,
        images: true,
        rating: true,
        reviewCount: true,
        createdAt: true, // Add createdAt
        updatedAt: true, // Add updatedAt
        supplier: { // Select all fields to match the Supplier type expected by Product
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
            email: true,
            phone: true,
            address: true,
            type: true, // type was already here
            createdAt: true, // Add supplier createdAt
            updatedAt: true, // Add supplier updatedAt
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Check if there are more products
    const hasMore = products.length > pageSize;

    // Remove the extra item before returning
    const paginatedProducts = hasMore ? products.slice(0, pageSize) : products;

    // Process products with optimized approach (avoid spread operator for better performance)
    const processedProducts = paginatedProducts.map((product) => {
      // Create a new object with only the fields we need
      return {
        id: product.id,
        name: product.name || '',
        slug: product.slug || product.id, // Use slug or fallback to ID
        price: typeof product.price === 'number' ? product.price : 0,
        details: product.details || '',
        size: product.size || '',
        published: !!product.published,
        outOfStock: !!product.outOfStock,
        inStock: !product.outOfStock, // Derive inStock
        imageUrl: product.imageUrl || '/fallback/fallback.avif',
        images: product.images || [product.imageUrl || '/fallback/fallback.avif'],
        type: 'product',
        rating: product.rating,
        reviewCount: product.reviewCount || 0,
        supplier: product.supplier,
        createdAt: product.createdAt, // Add createdAt
        updatedAt: product.updatedAt, // Add updatedAt
      };
    });

    return {
      products: processedProducts,
      hasMore,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array and no more pages in case of error
    return { products: [], hasMore: false };
  }
}
