'use server';

import { Product } from "@prisma/client";
import db from "@/lib/db";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await db.product.findMany();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square bg-gray-200 rounded mb-4">
              {/* 이미지가 있다면 여기에 표시 */}
              {product.photo ? (
                <img
                  src={product.photo}
                  alt={product.title}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-orange-500 font-bold">${product.price}</p>
            <div className="mt-4">
              <Link
                href={`/products/${product.id}`}
                className="bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
