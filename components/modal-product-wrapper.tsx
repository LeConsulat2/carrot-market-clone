'use client';


import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalWrapper from "./modal-wrapper";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  photo: string;
}

interface Props {
  productId: string;
}

export default function ProductModalContent({ productId }: Props) {
  const [product, setProduct] = useState<Product | null>(null);

  // 예시: /api/products/[id]로부터 JSON 형태로 상품 정보를 받아오는 로직
  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);
      })
      .catch(() => {
        setProduct(null);
      });
  }, [productId]);

  // 데이터가 로딩 중일 때 간단한 로딩 메시지
  if (!product) {
    return (
      <ModalWrapper>
        <div className="flex h-full items-center justify-center text-white">
          Loading…
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper>
      {/* ─── 1) 이미지 영역 ───────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-neutral-100">
        <Image
          src={product.photo}
          alt={product.title}
          width={300}
          height={300}
          className="object-cover rounded-md"
          priority
        />
      </div>

      {/* ─── 2) 설명 + → "Go to full product details" + 가격 영역 ────── */}
      <div className="border-t border-gray-200 px-6 py-4 bg-white flex flex-col">
        {/* 2-1) 상품 제목 */}
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          {product.title}
        </h2>

        {/* 2-2) 상품 설명 */}
        <p className="text-gray-600 mb-4">{product.description}</p>

        {/* 2-3) 전체 보기 링크 */}
        <Link
          href={`/products/${productId}`}
          className="text-blue-600 hover:underline mb-4"
        >
          → Go to full product details
        </Link>

        {/* 2-4) 가격 표시 */}
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-800">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </ModalWrapper>
  );
}
