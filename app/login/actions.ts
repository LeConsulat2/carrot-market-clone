'use server';

type State = {
  errors: string[];
  data: any | null;
};

export async function handleForm(
  prevState: State,
  formData: FormData,
): Promise<State> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // 여기에 실제 로그인 로직 구현
    // const user = await signIn(email, password);

    return {
      errors: [],
      data: { success: true },
    };
  } catch (error) {
    return {
      errors: [
        error instanceof Error
          ? error.message
          : '로그인 중 오류가 발생했습니다',
      ],
      data: null,
    };
  }
}
