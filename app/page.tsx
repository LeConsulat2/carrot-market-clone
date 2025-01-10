export default function Home() {
  return (
    <main className="bg-gray-300  sm:bg-red-200 md:bg-green-200 lg:bg-cyan-300 xl:bg-slate-950 h-screen flex items-center justify-center p-5 ">
      <div
        className="bg-white w-full  shadow-lg  
      rounded-2xl max-w-screen-sm p-5 dark:bg-white flex flex-col gap-3 "
      >
        {['Jonathan', 'Me', 'You', 'Mcdonalds'].map((person, index) => (
          <div
            key={index}
            className="flex items-center gap-4 odd:bg-gray-300 even:bg-cyan-100 rounded-xl p-1  "
          >
            <div className="size-8 bg-blue-400 rounded-full" />
            <div>
              <span className="text-lg font-medium">{person}</span>
            </div>
            <div className="size-6 bg-red-500 text-white flex justify-center items-center rounded-full">
              <span>{index}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
