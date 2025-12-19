import { decrement, increment } from "@/store/features/counter/counterSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function DeadPoolPage() {

    const dispatch = useDispatch<AppDispatch>();
    const count = useSelector((state: any)=> state.counter.value)
    return (
        <div className="p-8">
            <h1 className="text-[50px] font-bold mb-12">DeadPool Count: {count}</h1>
            <div className="flex gap-4">
                <button
                    className="w-24 h-24 bg-blue-500 hover:bg-blue-600 text-white text-5xl"
                    onClick={()=> dispatch(increment())}>
                        +
                </button>
                <button
                    className="w-24 h-24 bg-red-500 hover:bg-red-600 text-white text-5xl"
                    onClick={()=> dispatch(decrement())}>
                        -
                </button>
            </div>
        </div>
    )
}