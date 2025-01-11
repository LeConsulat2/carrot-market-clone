interface FormButtonProps {
  loading: boolean;
  text: string;
}

export default function FormButton({ loading, text }: FormButtonProps) {
  return (
    <button
      disabled={loading}
      className="primary-btn h-10 disabled:bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 disabled:cursor-not-allowed"
    >
      {loading ? 'Loading...' : text}
    </button>
  );
}
