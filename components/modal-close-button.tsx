'use client';

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function ModalCloseButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-gray-800 hover:text-gray-600"
    >
      <XMarkIcon className="w-6 h-6" />
    </button>
  );
}
