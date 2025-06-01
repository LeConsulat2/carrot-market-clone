'use client';

import ProductModalContent from "./modal-product-wrapper";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  photo: string;
}

interface ClientProductModalProps {
  product?: Product | null;
  productId?: string;
}

// This is a client component wrapper that can receive server component data
export function ClientProductModal({ product, productId }: ClientProductModalProps) {
  // If we have a product directly, use it
  if (product) {
    return <ProductModalContent product={product} />;
  }
  
  // If we have a productId, pass it to the modal component to fetch
  if (productId) {
    return <ProductModalContent productId={productId} />;
  }
  
  // If we have neither, show an error
  return <div>Product information missing</div>;
}
