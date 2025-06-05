import { UserIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return <div className="*:rounded-md flex items-center justify-center h-screen bg-gradient-to-br from-red-100 to-orange-100 animate-fade-in">
    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center border-2 border-red-200">
      <div className="size-10 rounded-full overflow-hidden border-2 border-orange-400">
        <UserIcon className="text-orange-400 w-10 h-10" />
      </div>
      <div>
        <h3 className="font-bold text-lg text-orange-700">Loading...</h3>
      </div>
    </div>
  </div>;
}