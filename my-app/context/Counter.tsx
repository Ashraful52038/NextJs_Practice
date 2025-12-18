'use client';
import { createContext, useState } from 'react';

export const CounterContext = createContext({})
    
export default function CounterProvider({
children,
}: {
children: React.ReactNode
}){

const [count,setCount]= useState(0);

const increment=()=>{
    setCount(prev => prev+1);
};

const decrement =()=>{
    setCount( prev => prev-1);
};

const value={
    count,
    increment,
    decrement
};


    return (
    <CounterContext.Provider value={value}>
        {children}
    </CounterContext.Provider>
    );
}