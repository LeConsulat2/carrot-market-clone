'use client';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  loading: boolean;
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 disabled:cursor-not-allowed"
    >
      {pending ? 'Loading...' : text}
    </button>
  );
}
