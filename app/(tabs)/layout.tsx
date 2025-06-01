import TabBar from '@/components/tab-bar';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/16/solid';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      {/* Floating Action Button */}
      <Link 
          href="/products/add" 
          className="fixed top-8 right-8 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2"
        >
          <span className="hidden sm:inline">Add Product</span>
          <PlusIcon className="size-6" />
        </Link>
      <TabBar />
    </div>
  );
}
