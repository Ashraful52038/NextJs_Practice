'use client';


function Homepage() {
  return (
    <div className="flex gap-6 justify-center mt-20">
        <button className="w-24 h-24 bg-blue-500 hover:bg-blue-600 text-white text-5xl">
          +
        </button>
        <button className="w-24 h-24 bg-red-500 hover:bg-red-600 text-white text-5xl">
          -
        </button>
    </div>
  )
}

export default Homepage;