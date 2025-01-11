import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

export default function Login() {
  async function handleForm(formData: FormData) {
    'use server';
    console.log(formData.get('email'), formData.get('password'));
  }

  return (
    <div className="flex flex-col gap-10 py-8 px-5">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Kia ora!</h1>
        <h2>Please log in with your email</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />

        <FormButton loading={false} text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
