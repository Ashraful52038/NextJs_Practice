import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  title: string;
  dueDate: string;
}

interface TodoState {
  todos: Todo[];
  nextId: number;
}

const initialState: TodoState = {
  todos: [],
  nextId: 1,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'id'>>) => {
      const newTodo: Todo = {
        id: state.nextId,
        title: action.payload.title,
        dueDate: action.payload.dueDate,
      };
      state.todos.push(newTodo);
      state.nextId += 1;
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;