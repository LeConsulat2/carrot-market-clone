import db from '@/lib/db';
import Link from 'next/link';
import ProductList from '@/components/product-list';
import { Prisma } from '@prisma/client';
import { unstable_cache as nextCache } from 'next/cache';

const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {
 
});

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}

export type initialProducts = Prisma.PromiseReturnType<typeof getCachedProducts>;

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  const initialProducts = await getCachedProducts();
  const { deleted } = await searchParams;
  const showDeletedBanner = deleted === '1';

  return (
    <div className="p-5 flex flex-col gap-5">
      {showDeletedBanner && <DeletedBanner />}
      <ProductList initialProducts={initialProducts} />
    </div>
  );
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
          href="/home" 
          className="ml-4 underline hover:text-orange-100 transition"
        >
          Dismiss
        </Link>
      </div>
    </div>
  );
}