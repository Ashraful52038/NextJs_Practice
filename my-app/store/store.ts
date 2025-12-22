import todoReducer from "@/app/Todo/ToDoSlice"; // TodoSlice import করুন
import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./features/counter/CounterSlice";

export const store = configureStore({
    reducer: {
        count: countReducer,
        todos: todoReducer, // ✅ Todo reducer যোগ করুন
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;