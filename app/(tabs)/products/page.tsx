import ListProduct from '@/components/list-product';  // (1) 개별 제품 렌더링 컴포넌트 (사용하지 않음, 예시)
import db from '@/lib/db';                          // (2) Prisma 클라이언트 인스턴스
import Link from 'next/link';                       // (3) Next.js 링크 컴포넌트 (클라이언트 측 navigation)
import ProductList from '@/components/product-list';// (4) 제품 목록 렌더링 컴포넌트
import { Prisma } from '@prisma/client';            // (5) Prisma 타입 유틸리티
import { PlusIcon } from '@heroicons/react/16/solid';// (6) Heroicons에서 플러스 아이콘 임포트

// (7) 서버에서 최초 제품 데이터를 가져오는 비동기 함수
async function getInitialProducts() {
  // ───────────────────────────────────────────────────────────────────────────
  // (8) 실제 DB 쿼리 전에 딜레이를 주고 싶다면 아래 주석을 해제하세요
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // (9) Prisma를 이용해 product 테이블에서 최신 제품 하나를 선택
  const products = await db.product.findMany({
    select: {
      title: true,       // 제목
      price: true,       // 가격
      created_at: true,  // 생성일
      photo: true,       // 이미지 URL 혹은 바이너리
      id: true,          // 고유 ID
    },
    take: 1,              // 가장 최근 한 개만 가져오기
    orderBy: {
      created_at: 'desc', // 생성일 기준 내림차순 정렬 → 최신순
    },
  });

  return products;       // (10) 조회된 배열 반환
}

// (11) getInitialProducts 함수의 반환값 타입을 Prisma 유틸로 추출
export type initialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

// (12) 삭제 성공 시 상단에 표시할 배너 컴포넌트
function DeletedBanner() {
  return (
    <div className="w-full flex justify-center mb-6 animate-fade-in">
      <div className="flex items-center gap-3 
                      bg-gradient-to-r from-orange-400 to-red-400 
                      text-white px-6 py-3 rounded-xl shadow-lg border-2 border-red-200">
        {/* (13) 닫기 아이콘 */}
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

        {/* (14) 메시지 텍스트 */}
        <span className="font-semibold text-lg">
          Product deleted successfully.
        </span>

        {/* (15) 배너 닫기(리프레시) 링크 */}
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

// (16) 메인 페이지 컴포넌트: 서버 컴포넌트(async)로 searchParams를 await
export default async function Products({
  // Next.js 15+ 에서는 searchParams가 Promise 형태로 넘어옴
  searchParams,
}: {
  // searchParams를 Promise로 선언
  searchParams: Promise<{ deleted?: string }>;
}) {
  // (17) 1) 제품 목록 데이터 불러오기
  const initialProducts = await getInitialProducts();

  // (18) 2) searchParams 객체 자체를 await하여 해제(unwrap)하기
  const { deleted } = await searchParams;

  // (19) 3) deleted 쿼리 파라미터가 '1'일 때만 배너 표시
  //     URL 예: /products?deleted=1
  const showDeletedBanner = deleted === '1';

  return (
    <div className="p-5 flex flex-col gap-5">
      {/* (20) 삭제 배너 조건부 렌더링 */}
      {showDeletedBanner && <DeletedBanner />}

      {/* (21) 제품 목록 컴포넌트에 초기 데이터 전달 */}
      <ProductList initialProducts={initialProducts} />

      {/* (22) 새 제품 추가 페이지로 가는 버튼 */}
      <Link href="/products/add" className="primary-btn">
        Add Product
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}

// 참고: <ListProduct id={product.id} title={product.title} ... /> 방식도 사용 가능
