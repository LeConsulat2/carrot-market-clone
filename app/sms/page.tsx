import FormButton from '@/components/button';
import FormInput from '@/components/form-input';

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-5">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2>Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="number"
          placeholder="Mobile Number"
          required
          errors={[]}
        />
        <FormInput
          type="number"
          placeholder="Verification Code"
          required
          errors={[]}
        />

        <FormButton loading={false} text="Verify" />
      </form>
    </div>
  );
}
