import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-5">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Kia ora!</h1>
        <h2>Check out the Form below to explore!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <input
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 border-none ring-neutral-300"
            type="text"
            placeholder="Username"
            required
          />
          <span className="text-red-500 ml-1">Input error</span>
        </div>
        <button className=" primary-btn py-2">Create Account</button>
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <div>
        <Link
          className="primary-btn flex h-8 items-center justify-center font-light gap-2"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 " />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
