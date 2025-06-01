// path: app/products/page.tsx (UPDATE existing file)
"use server";

import { Suspense } from "react";
import ProductSearch from "@/components/product-search";
import { searchProducts } from "@/app/actions/search";
import ProductList from '@/components/product-list';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/16/solid';
import db from '@/lib/db';

// Get initial products for the page
async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 10, // Show more products on the main page
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}

function DeletedBanner() {
  return (
    <div className="w-full flex justify-center mb-6 animate-fade-in">
      <div className="flex items-center gap-3 
                      bg-gradient-to-r from-orange-400 to-red-400 
                      text-white px-6 py-3 rounded-xl shadow-lg border-2 border-red-200">
        <svg
          className="w-6 h-6 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span className="font-semibold text-lg">
          Product deleted successfully.
        </span>
        <Link
          href="/products" 
          className="ml-4 underline hover:text-orange-100 transition"
        >
          Dismiss
        </Link>
      </div>
    </div>
  );
}

// 'Add Product' 버튼을 위한 새 함수
function AddProductButton() {
  return (
    <Link href="/products/add" legacyBehavior passHref>
      <a className="primary-btn"> {/* Link의 자식을 <a> 태그로 감싸줍니다. */}
        Add Product
        <PlusIcon className="size-10" />
      </a>
    </Link>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  const initialProducts = await getInitialProducts();
  const { deleted } = await searchParams;
  const showDeletedBanner = deleted === '1';

  return (
    <div className="p-5 flex flex-col gap-5">
      {showDeletedBanner && <DeletedBanner />}
      
      {/* Search Component */}
      <div className="mb-6">
        <Suspense fallback={<div>Loading search...</div>}>
          <ProductSearch 
            onSearch={searchProducts}
            placeholder="Search for products..."
            className="mb-4"
          />
        </Suspense>
      </div>
      
      {/* Product List */}
      <ProductList initialProducts={initialProducts} />
      
      {/* Add Product Button */}
      <AddProductButton />
    </div>
  );
}