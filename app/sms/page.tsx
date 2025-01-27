'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useActionState } from 'react';
import { SMSLogin } from './action';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';

export default function SMSLoginPage() {
  const initialState = {
    token: false,
    error: undefined,
  };

  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [state, dispatch] = useActionState(SMSLogin, initialState);

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button
        loading={pending}
        text={
          // 1. 먼저 pending 상태 체크
          pending
            ? 'Verifying...' // pending이 true면 이 텍스트 표시
            : // 2. pending이 false일 때, state.token 체크
            state.token
            ? 'Verify Token' // token이 true면 이 텍스트
            : 'Send Verification SMS' // token이 false면 이 텍스트
        }
      />
    );
  }

  const handleSubmit = (formData: FormData) => {
    if (!state.token) {
      setMobileNumber(formData.get('mobile_number') as string);
    }
    dispatch(formData);
  };

  // onChange 핸들러 추가
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!state.token) {
      // token이 false일 때만 변경 가능
      setMobileNumber(e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-10 py-8 px-5">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2>Verify your phone number.</h2>
      </div>
      <form action={handleSubmit} className="flex flex-col gap-3">
        <Input
          name="mobile_number"
          type="number"
          placeholder="Mobile Number"
          required
          value={mobileNumber}
          onChange={handleMobileNumberChange} // onChange 핸들러 추가
          readOnly={state.token} // token이 true일 때만 읽기 전용
          errors={state.errors?.mobile_number || []}
        />
        {state.token && (
          <Input
            name="verification_code"
            type="number"
            placeholder="Verification Code"
            required
            min={100000}
            max={999999}
            errors={state.errors?.verification_code || []}
          />
        )}
        <SubmitButton
          text={state.token ? 'Verify Token' : 'Send Verification SMS'}
        />
      </form>
    </div>
  );
}
