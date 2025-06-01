'use server';

import ProductModalContent from "@/components/ProductModalContent";

export default async function ModalPage({
  params,
}: {
  params: { id: string };
}) {
  // params.id를 받아서 그대로 ProductModalContent 컴포넌트에 넘겨줍니다.
  const productId = params.id;
  return <ProductModalContent productId={productId} />;
}
