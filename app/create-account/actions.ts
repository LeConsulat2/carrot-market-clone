'use server';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import { PASSWORD_REGEX } from '@/lib/constants';
import { z } from 'zod';
import db from '@/lib/db';

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  // if (user) {
  //   return false;
  // } else {
  //   return true;
  // }
  return !Boolean(user);
};

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

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) === false;
};

const checkUsername = (username: string) => {
  return !username.includes('aut');
};

const formSchema = z
  .object({
    username: z
      .string()
      .min(8, 'Username must be at least 4 characters')
      .max(15, 'Username must be at most 15 characters')
      .toLowerCase()
      .trim()
      //.transform((username) => `AUT ${username}`)
      .refine(checkUsername, 'Username cannot include AUT')
      .refine(checkUniqueUsername, 'This username is already taken'),

    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkUniqueEmail, 'This email is already registered'),

    password: z.string().min(PASSWORD_MIN_LENGTH),
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    //confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
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
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // Since email and username uniqueness are now checked in the schema,
  // we can proceed directly to user creation

  // hash password
  // save the user to db
  // log the user in
  // redirect "/home"
  return { success: true };
}
