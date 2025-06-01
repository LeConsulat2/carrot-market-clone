"use client";

import { useEffect, useRef, useState } from "react";
import ListProduct from "./list-product";
import { getMoreProducts } from "@/app/(tabs)/home/actions";
import type { initialProducts } from "@/app/(tabs)/home/page"; 

interface ProductListProps {
  initialProducts: initialProducts ;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<initialProducts>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);

  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length > 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      { threshold: 1.0 }
    );

    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {/* {!isLastPage ? (
      <button
        className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95 disabled:opacity-60"
        ref={trigger}
        disabled={isLoading}
      >
        {isLoading ? "Loading…" : "Load More"}
      </button>
    ) : ( */}
      <div className="mx-auto mt-4 text-gray-400 text-sm font-medium animate-fade-in">
        🎉 You've reached the end. No more products!
      </div>
    
    </div>
  );
}
