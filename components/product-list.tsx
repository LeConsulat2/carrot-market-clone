"use client";

import { useEffect, useRef, useState } from "react";
import ListProduct from "./list-product";
import { getMoreProducts } from "@/app/(tabs)/products/action";
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
      {products.map((p) => (
        <ListProduct key={p.id} {...p} />
      ))}

      {!isLastPage ? (
        <span
          className="mt-[300vh] mb-96 self-center px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          ref={trigger}
          style={{marginTop: `${page +1 * 900}vh`}}
        >
          {isLoading ? "Loading…" : "Load More"}
        </span>
      ) : null}
    </div>
  );
}
