'use client';

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ModalWrapper({ children }: Props) {
  // ✅ Next.js Router는 CSR 환경에서만 존재
  //if (typeof window === 'undefined') return null;

  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative">
        {children}
      </div>
    </div>
  );
}
