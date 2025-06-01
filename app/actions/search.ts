"use server";

import db from "@/lib/db";

export async function searchProducts(query: string | null | undefined) {
  if (!query || query.trim() === "") {
    // If no query, return initial/recent products
    return db.product.findMany({
      select: {
        title: true,
        price: true,
        created_at: true,
        photo: true,
        id: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 10, 
    });
  }

  // If there is a query, search for products
  const products = await db.product.findMany({
    where: {
      title: {
        contains: query
      },
    },
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    orderBy: {
      created_at: "desc", // Optional: order search results
    },
  });
  return products;
}
