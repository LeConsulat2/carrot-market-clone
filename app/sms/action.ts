'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

// 타입 정의
type ActionState = {
  token: boolean;
  errors?: {
    mobile_number?: string[];
    verification_code?: string[];
    _form?: string[];
  };
};

// Zod 스키마 정의
const mobileNumberSchema = z
  .string()
  .trim()
  .refine(
    (number) => validator.isMobilePhone(number, 'en-NZ'),
    '올바른 휴대폰 번호를 입력해주세요',
  );

const verificationCodeSchema = z.coerce
  .number()
  .min(100000, '인증번호는 6자리여야 합니다')
  .max(999999, '인증번호는 6자리여야 합니다');

export async function SMSLogin(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const mobile_number = formData.get('mobile_number')?.toString();
    const verification_code = formData.get('verification_code')?.toString();

    // 첫 단계: 휴대폰 번호 검증
    if (!prevState.token) {
      const result = mobileNumberSchema.safeParse(mobile_number);

      if (!result.success) {
        return {
          token: false,
          errors: {
            mobile_number: [result.error.errors[0].message],
          },
        };
      }

      // TODO: 실제 SMS 발송 로직
      // await sendVerificationSMS(result.data);

      return {
        token: true,
        errors: {},
      };
    }

    // 두 번째 단계: 인증번호 검증
    const result = verificationCodeSchema.safeParse(verification_code);

    if (!result.success) {
      return {
        token: true,
        errors: {
          verification_code: [result.error.errors[0].message],
        },
      };
    }

    // TODO: 실제 인증번호 확인 로직
    // await verifyCode(mobile_number, result.data);

    redirect('/'); // 인증 성공시 리다이렉트
  } catch (error) {
    return {
      token: prevState.token,
      errors: {
        _form: [error instanceof Error ? error.message : '오류가 발생했습니다'],
      },
    };
  }
}
