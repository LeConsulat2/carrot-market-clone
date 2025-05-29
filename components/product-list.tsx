"use client";

import { useState } from "react";
import ListProduct from "./list-product";
import { getMoreProducts } from "@/app/(tabs)/products/action";
import type { initialProducts } from "@/app/(tabs)/products/page"; // adjust to your actual Product type

interface ProductListProps {
  initialProducts: initialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<initialProducts>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const moreProducts = await getMoreProducts(products.length);
    setProducts(prev => [...prev, ...moreProducts]);
    setIsLoading(false);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map(p => (
        <ListProduct key={p.id} {...p} />
      ))}

      <button
        onClick={onLoadMoreClick}
        disabled={isLoading}
        className="self-center px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isLoading ? "Loading…" : "Load More"}
      </button>
    </div>
  );
}
