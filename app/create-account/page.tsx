'use client';

import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { createAccount } from './actions';
import { useActionState } from 'react';

export default function CreateAccount() {
  const [state, dispatch, isPending] = useActionState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-5">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Kia ora!</h1>
        <h2>Check out the Form below to explore!</h2>
      </div>

      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.errors?.username}
        />
        <Input name="email" type="email" placeholder="Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors?.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          errors={state?.errors.confirm_password}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Creating Account...' : 'Create Account'}
        </button>

        <SocialLogin />
      </form>
    </div>
  );
}
