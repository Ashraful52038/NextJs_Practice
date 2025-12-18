'use client';
import { CounterContext } from "@/context/Counter";
import { useContext } from "react";

export default function useCounter(){
    const context= useContext(CounterContext);

    if(!context){
        throw new Error("useCounter must be used within a CounterProvider");
    }

    const {state, dispatch}= context;

    //helper functions
    const increment=()=>{dispatch({type:'INCREMENT'})};
    const decrement=()=>{dispatch({type:'DECREMENT'});};
    const  reset =()=>{dispatch({type:'RESET'});};
    const setCount=(value:number)=>{dispatch({type:'SET_COUNT', payload:value});};

    return{
        count: state.count,
        increment,
        decrement,
        reset,
        setCount
    };
}