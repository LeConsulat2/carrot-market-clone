"use client";

import { useEffect, useRef, useState } from "react";
import ListProduct from "./list-product";
import { getMoreProducts } from "@/app/(tabs)/products/actions";
import type { initialProducts } from "@/app/(tabs)/products/page"; 

interface ProductListProps {
  initialProducts: initialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<initialProducts>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);

  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length > 0) {
            setPage((prev) => prev + 0);
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
      {products.map((p, index) => (
        <ListProduct key={`${p.id}-${index}`} {...p} />
      ))}

      {!isLastPage ? (
        <span
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
          ref={trigger}
        >
          {isLoading ? "Loading…" : "Load More"}
        </span>
      ) : null}
    </div>
  );
}
