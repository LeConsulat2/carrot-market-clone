import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToDollar } from '@/lib/utils';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function getIsOwner(userId: number) {
  // const session = await getSession();
  // return session.id === userId;
}

async function getProduct(id: number) {
  return await db.product.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
}

async function deleteProduct(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  const session = await getSession();
  const product = await db.product.findUnique({ where: { id } });
  if (!product || product.userId !== session.id) {
    throw new Error('Unauthorized');
  }
  await db.product.delete({ where: { id } });
  revalidatePath('/products');
  redirect('/products?deleted=1');
}

function DeletedMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-100 to-orange-100 animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center border-2 border-red-200">
        <svg
          className="w-16 h-16 text-red-500 mb-4 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <h2 className="text-3xl font-extrabold text-red-600 mb-2 drop-shadow">Product Deleted</h2>
        <p className="text-gray-700 mb-4 text-lg">The product has been successfully deleted.</p>
        <Link
          href="/products"
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          Go to Products
        </Link>
      </div>
    </div>
  );
}

////// ✅ FIXED: Properly await `params` and `searchParams`
export default async function ProductDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ deleted?: string }>;
}) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  if (resolvedSearchParams.deleted === '1') {
    return <DeletedMessage />;
  }
  const id = Number(resolvedParams.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const productWithUserId = await db.product.findUnique({
    where: { id },
    select: { userId: true },
  });
  const isOwner = await getIsOwner(productWithUserId?.userId ?? 0);
  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          src={product.photo}
          alt={product.title}
          className="object-cover"
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="size-10 rounded-full overflow-hidden border-2 border-orange-400">
          {product.user.avatar !== null ? (
            <Image
              fill
              src={product.user.avatar}
              alt={product.user.username}
              className="object-cover"
            />
          ) : (
            <UserIcon className="text-orange-400 w-10 h-10" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-lg text-orange-700">
            {product.user.username}
          </h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold text-neutral-800 mb-2">
          {product.title}
        </h1>
        <p className="text-neutral-600 mb-4">{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-gradient-to-r from-orange-200 to-red-200 flex justify-between items-center shadow-lg">
        <span className="text-2xl font-bold text-orange-700">
          $ {formatToDollar(product.price)}
        </span>
        {isOwner ? (
          <form action={deleteProduct} className="inline">
            <input type="hidden" name="id" value={product.id} />
            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-orange-500 px-5 py-2.5 rounded-md text-white font-semibold shadow hover:scale-105 transition"
            >
              Delete Product
            </button>
          </form>
        ) : null}
        {isOwner ? null : (
          <Link
            className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold shadow hover:bg-orange-600 transition"
            href=""
          >
            Start Chats
          </Link>
        )}
    
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

