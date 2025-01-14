import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-5">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Kia ora!</h1>
        <h2>Check out the Form below to explore!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="text" placeholder="Username" required errors={[]} />
        <FormInput type="email" placeholder="Email" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="Confim password"
          required
          errors={[]}
        />
        <FormButton loading={false} text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  );
}
