// This file is now purely a Server Component

// Link might be used if there are server-rendered links, otherwise can be removed if only NewProductPageContent uses it.
// For now, assuming Button might be used for other server-side conditional UI, keeping its import.
// import Link from 'next/link'; 
// import { Button } from '@/components/ui/button'; 

import db from '@/lib/prisma';

import NewProductPageContent from './new-product-page-content'; // Import the new Client Component

// Interface for categories, still needed for data fetching
interface SimpleCategory {
  id: string;
  name: string;
}

// This is now an async Server Component
export default async function NewProductPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  let categories: SimpleCategory[] = [];
  try {
    categories = await db.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error("Error fetching categories directly on server:", error);
  }

  const initialSupplierId = typeof searchParams?.supplierId === 'string' ? searchParams.supplierId : undefined;
  let initialSupplierName: string | null = null;

  if (initialSupplierId) {
    try {
      const supplier = await db.supplier.findUnique({
        where: { id: initialSupplierId },
        select: { name: true },
      });
      initialSupplierName = supplier?.name || null;
    } catch (error) {
      console.error(`Error fetching supplier name for ID ${initialSupplierId}:`, error);
    }
  }

  return (
    <NewProductPageContent
      categories={categories}
      initialSupplierId={initialSupplierId}
      initialSupplierName={initialSupplierName}
    />
  );
}
