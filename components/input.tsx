import { InputHTMLAttributes } from 'react';

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition border-none ring-neutral-300"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 ml-1">
          {error}
        </span>
      ))}
    </div>
  );
}
