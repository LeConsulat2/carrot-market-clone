import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
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
        <FormInput type="text" placeholder="Username" required errors={[]} />
        <FormInput type="email" placeholder="Email" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="Confim password"
          required
          errors={[]}
        />
        <FormButton loading={true} text="Create Account" />
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
