'use server';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import { z } from 'zod';

type State = {
  errors: string[];
  data: { success: boolean } | null; // any 대신 구체적인 타입
};

// formSchema가 두 번 정의되어 있었음. 하나로 통합
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(
  prevState: any,
  formData: FormData,
): Promise<State> {
  try {
    // FormData를 Object로 변환 (= 대신 : 사용)
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    // Zod로 데이터 검증
    const result = formSchema.safeParse(data);

    // 검증 실패시
    if (!result.success) {
      return {
        errors: Object.values(result.error.flatten().fieldErrors).flat(), // flat() 추가
        data: null,
      };
    }

    // 검증 성공시 Login logic 실행
    return {
      errors: [],
      data: { success: true },
    };
  } catch (error) {
    return {
      errors: [
        error instanceof Error
          ? error.message
          : 'There was an error logging in',
      ],
      data: null,
    };
  }
}
