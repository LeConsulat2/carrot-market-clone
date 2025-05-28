'use client';

import { useFormStatus } from 'react-dom';
import FormButton from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { login } from './actions';
import { PASSWORD_REGEX } from '@/lib/constants';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import { useActionState } from 'react';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <FormButton loading={pending} text="Log In" />;
}

export default function Login() {
  const initialState = {
    fieldErrors: {
      email: [],
      password: [],
    },
  };

  const [state, dispatch] = useActionState(login, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-5">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Kia ora!</h1>
        <h2>Please log in with your email</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input name="email" type="email" placeholder="Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          //pattern={PASSWORD_REGEX.toString()}
        />
        <SubmitButton />
      </form>
      {state?.fieldErrors && (
        <p className="text-green-500">{state.fieldErrors.email}</p>
      )}
      <div>
        <p>
          If you haven't got an account with us, please click here to{' '}
          <Link href="/create-account" className="text-sky-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <SocialLogin />
    </div>
  );
}
