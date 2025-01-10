export default function Home() {
  return (
    <main className="bg-gray-300  sm:bg-red-200 md:bg-green-200 lg:bg-cyan-300 xl:bg-slate-950 h-screen flex items-center justify-center p-5 ">
      <div className="bg-white w-full flex flex-col flex-1 md:flex-row gap-2 shadow-lg  rounded-2xl max-w-screen-sm p-5 ring ring-transparent transition-shadow has-[:invalid]:ring  has-[:invalid]:ring-red-200  dark:bg-white">
        <div className="flex flex-col flex-1 *:outline-none">
          <input
            className="w-full h-11 pl-4 bg-gray-300 rounded-full  
            ring ring-transparent 
            focus:valid:ring-green-500 focus:ring-2 focus:ring-offset-2
            focus:invalid:ring-red-500 
            transition-all placeholder:drop-shadow 
            peer"
            type="email"
            required
            placeholder="Email address"
          />
          <span className="h-6 text-red-500 font-medium pl-3 hidden peer-invalid:block">
            Email is required
          </span>
        </div>
        <button
          className="hover:scale-90 text-white py-2 rounded-full md:px-10 active:scale-90 focus:scale-95 transition-transform font-medium  
        bg-gradient-to-tr from-black via-gray-700 to-slate-400
        peer-valid:bg-gradient-to-tr peer-valid:from-green-500 peer-valid:via-green-600 peer-valid:to-green-700"
        >
          Login
        </button>
      </div>
    </main>
  );
}
