'use server';

import { z } from 'zod';

// State 타입을 명시적으로 정의
// errors는 각 필드별 에러 메시지 배열을 담는 객체
// data는 성공 시 반환할 데이터 객체
type State = {
  errors: {
    mobile_number?: string[];
    verification_code?: string[];
    _form?: string[]; // 폼 전체 에러를 위한 필드
  };
  data: { success: boolean } | null;
};

// Zod 스키마 정의
// 필드명은 form의 input name 속성과 일치해야 함
const smsSchema = z.object({
  mobile_number: z.string().min(10, 'Invalid mobile number'),
  verification_code: z.string().min(4, 'Invalid verification code'),
});

// Server Action 함수
// prevState: 이전 상태 (현재는 any 타입)
// formData: 폼에서 전송된 데이터
// Promise<State>: 함수가 State 타입의 Promise를 반환한다는 의미
export async function smsLogin(
  prevState: any,
  formData: FormData,
): Promise<State> {
  try {
    // FormData에서 값을 추출하여 객체로 변환
    // get() 메서드로 각 필드의 값을 가져옴
    const data = {
      mobile_number: formData.get('mobile_number'),
      verification_code: formData.get('verification_code'),
    };

    // Zod로 데이터 유효성 검사
    // safeParse()는 유효성 검사 결과를 객체로 반환
    const result = smsSchema.safeParse(data);

    // 유효성 검사 실패 시
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors, // Zod의 에러 메시지를 필드별로 정리
        data: null,
      };
    }

    // 여기서 실제 SMS 인증 로직 구현
    // const verification = await verifySMSCode(result.data);

    // 성공 시 반환값
    return {
      errors: {}, // 에러 없음
      data: { success: true }, // 성공 데이터
    };
  } catch (error) {
    // 예상치 못한 에러 발생 시
    return {
      errors: {
        _form: [
          error instanceof Error
            ? error.message // Error 객체면 메시지 사용
            : 'An error occurred', // 아니면 기본 메시지
        ],
      },
      data: null,
    };
  }
}
