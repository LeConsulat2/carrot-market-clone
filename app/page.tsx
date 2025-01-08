export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full shadow-lg p-5 rounded-2xl">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-gray-500 font-semibold -mb-1">
                In Transit
              </span>
              <span className="text-4xl font-semibold">Coolblue</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-400"></div>
          </div>
          <div className="my-2 flex items-center gap-2">
            <span className="bg-green-400 text-white uppercase px-2 py-1 text-xs font-medium rounded-xl">
              Today
            </span>
            <span>9:30-10:30</span>
          </div>

          <div className="relative">
            <div className="bg-gray-200 absolute w-full h-2 rounded-full"></div>
            <div className="bg-green-400 absolute w-1/2 h-2 rounded-full"></div>
          </div>
          <div className="flex justify-between items-center mt-4 text-gray-700">
            <span>Expected</span>
            <span>Sorting</span>
            <span>In Transit</span>
            <span className="text-gray-400">Delivered</span>
          </div>
        </div>
      </div>
    </main>
  );
}
