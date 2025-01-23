'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useActionState } from 'react';
import { smsLogin } from './action';
import { useFormStatus } from 'react-dom';

export default function SMSLogin() {
  // login 페이지처럼 initialState 추가
  const initialState = {
    errors: {},
    data: null,
  };

  const [state, dispatch] = useActionState(smsLogin, initialState); // isPending 대신 useFormStatus 사용

  // login 페이지처럼 별도의 SubmitButton 컴포넌트
  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button loading={pending} text={pending ? 'Verifying...' : 'Verify'} />
    );
  }

  return (
    <div className="flex flex-col gap-10 py-8 px-5">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2>Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="mobile_number"
          type="number"
          placeholder="Mobile Number"
          required
          errors={state?.errors?.mobile_number || []}
        />
        <Input
          name="verification_code"
          type="number"
          placeholder="Verification Code"
          required
          errors={state?.errors?.verification_code || []} // 배열 중첩 제거
        />
        <SubmitButton /> {/* 별도 컴포넌트 사용 */}
      </form>
      {state?.data && ( // 성공 메시지 추가
        <p className="text-green-500">Verification successful!</p>
      )}
    </div>
  );
}
