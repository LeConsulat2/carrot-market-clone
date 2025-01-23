'use server';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import { PASSWORD_REGEX } from '@/lib/constants';
import { z } from 'zod';

function checkUsername(username: string) {
  return username.includes('aut') ? false : true;
}

/*if (username.includes('aut')) {
  return false;
} else {
  return true;
}     ? false : true is basically like this ok? 
     
-- You can also write it like this:
    function checkUsername(username: string) {
        return !username.includes("aut")
    }
*/

const formSchema = z
  .object({
    username: z
      .string()
      .min(5, 'Username must be at least 5 characters')
      .max(15, 'Username must be at most 15 characters')
      .toLowerCase()
      .trim()
      //.transform((username) => `AUT ${username}`)
      .refine(checkUsername, 'Username cannot include AUT'),

    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX),

    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  } else {
    console.log(result.data);
  }
}
