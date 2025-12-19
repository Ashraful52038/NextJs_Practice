'use client';

import { CounterContext } from "@/context/Counter";
import { useContext } from "react";


function Homepage() {

  const context = useContext(CounterContext);

  if(!context)return <div>Loading....</div>

  const {state, dispatch}= context as any;

  return (
    <div className="flex gap-6 justify-center mt-20">
      <h1 className="text-[50px] font-bold mb-12">Count: {state.count}</h1>
        <button className="w-24 h-24 bg-blue-500 hover:bg-blue-600 text-white text-5xl"
        onClick={()=>dispatch({type:'INCREMENT'})}>
          +
        </button>
        <button className="w-24 h-24 bg-red-500 hover:bg-red-600 text-white text-5xl"
        onClick={()=>dispatch({type:'DECREMENT'})}>
          -
        </button>
    </div>
  )
}

export default Homepage;