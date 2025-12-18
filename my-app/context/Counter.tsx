'use client';
import { createContext, ReactNode, useReducer } from 'react';

//Types define
type counterState={
    count:number;
};

type counterAction=
| {type:'INCREMENT'}
| {type:'DECREMENT'}
| {type:'RESET'}
| {type: 'SET_COUNT'; payload: number};


//Reducer function
function counterReducer(state:counterState,action:counterAction):counterState{
    switch(action.type){
        case 'INCREMENT':
            return {count: state.count + 1};
        case 'DECREMENT':
            return {count: state.count - 1};
        case 'RESET':
            return {count: 0};
        case 'SET_COUNT':
            return {count: action.payload};
        default:
            return state;
    }
}

//context type
export const CounterContext = createContext({})
    
export default function CounterProvider({children}: {children: ReactNode}){
    const [state, dispatch] = useReducer(counterReducer, {count:0});

    return(
    <CounterContext.Provider value={{state, dispatch}}>
        {children}
    </CounterContext.Provider>
    );
}
