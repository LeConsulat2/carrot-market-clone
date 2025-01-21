'use server';
import { z } from 'zod';

function checkUsername(username: string) {
  return username.includes('aut') ? false : true;
}

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
);

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
    password: z
      .string()
      .min(8)
      .regex(
        passwordRegex,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    confirm_password: z
      .string()
      .min(8)
      .regex(
        passwordRegex,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
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
