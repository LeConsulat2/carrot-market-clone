'use client';
import { useFormStatus } from 'react-dom';

interface ButtonProps {
  loading: boolean;
  text: string;
}

export default function Button({ text }: ButtonProps) {
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
