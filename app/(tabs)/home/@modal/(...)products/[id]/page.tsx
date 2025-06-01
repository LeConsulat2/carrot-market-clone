import db from '@/lib/db';
import ModalWrapper from '@/components/modal-wrapper';
import Image from 'next/image';
import Link from 'next/link';

// This is a server component - no 'use client' directive
export default async function ModalPage({
  params,
}: {
  params: { id: string };
}) {
  // In server components, we need to properly handle params
  // Await the params object before accessing its properties
  const resolvedParams = await Promise.resolve(params);
  const id = Number(resolvedParams.id);
  
  // Fetch product data server-side
  const product = await db.product.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      photo: true,
    },
  });
  
  if (!product) {
    return (
      <ModalWrapper>
        <div className="flex h-full items-center justify-center text-white">
          Product not found
        </div>
      </ModalWrapper>
    );
  }
  
  // Render the modal UI directly in the server component
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
          href={`/products/${product.id}`}
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
