'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import FormButton from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { login } from './actions';
import { PASSWORD_REGEX } from '@/lib/constants';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <FormButton loading={pending} text="Log In" />;
}

export default function LogIn() {
  const initialState = {
    errors: [],
    data: null,
  };

  const [state, action] = useActionState(login, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-5">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Kia ora!</h1>
        <h2>Please log in with your email</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input name="email" type="email" placeholder="Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          pattern={PASSWORD_REGEX.toString()}
        />
        <SubmitButton />
      </form>
      {state?.data && (
        <p className="text-green-500">Form submitted successfully!</p>
      )}
      <SocialLogin />
    </div>
  );
}
