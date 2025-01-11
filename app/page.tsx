import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl hover:animate-pulse transition-colors">
          🥕
        </span>
        <h1 className="text-4xl inline-block hover:animate-pulse">Carrot</h1>
        <h2 className="text-2xl inline-block hover:animate-pulse">
          Welcome to Carrot-Market Clone Page!
        </h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account" className="primary-btn py-2.5">
          Start
        </Link>
        <div className="flex gap-2">
          <span>Already have an account with us?</span>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
