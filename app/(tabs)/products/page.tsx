import ListProduct from '@/components/list-product';
import db from '@/lib/db';
import Link from 'next/link';
import ProductList from '@/components/product-list';
import { Prisma } from '@prisma/client';

function DeletedBanner() {
  return (
    <div className="w-full flex justify-center mb-6 animate-fade-in">
      <div className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-3 rounded-xl shadow-lg border-2 border-red-200">
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

async function getInitialProducts() {
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take:1,
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}

export type initialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export default async function Products({
  searchParams,
}: {
  searchParams?: { deleted?: string };
}) {
  const initialProducts = await getInitialProducts();
  return (
    <div className="p-5 flex flex-col gap-5">
      {searchParams?.deleted === '1' && <DeletedBanner />}
     <ProductList initialProducts={initialProducts} />
    </div>
  );
}

// <ListProduct id ={product.id} title={product.title}... 라고 할수도 있지만
