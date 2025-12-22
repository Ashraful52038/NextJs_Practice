import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  searchQuery: string;
  nextId: number;
}

const initialState: TodoState = {
  todos: [
    { id: 1, title: 'Learn React', dueDate: '2024-01-15', completed: false },
    { id: 2, title: 'Build Project', dueDate: '2024-01-20', completed: true },
  ],
  filter: 'all',
  searchQuery: '',
  nextId: 3,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'id' | 'completed'>>) => {
      const newTodo: Todo = {
        ...action.payload,
        id: state.nextId,
        completed: false,
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
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>)=>{
      state.filter = action.payload;
    },
    setSearchQuery:(state, action:PayloadAction<string>)=>{
      state.searchQuery= action.payload;
    },
    clearCompleted : (state)=>{
      state.todos = state.todos.filter(todo => !todo.completed);
    }
  },
});

export const{
  addTodo, 
  updateTodo, 
  deleteTodo, 
  toggleTodo,
  setFilter,
  setSearchQuery,
  clearCompleted,
}= todoSlice.actions;

//selectors
export const selectAllTodos = (state: { todos: TodoState }) => state.todos.todos;
export const selectFilter = (state: { todos: TodoState }) => state.todos.filter;
export const selectSearchQuery = (state: { todos: TodoState }) => state.todos.searchQuery;

// Filtered todos selector
export const selectFilteredTodos=(state: { todos: TodoState }) => {
  const { todos, filter, searchQuery } = state.todos;

  let filteredTodos = [...todos];

  // Apply filter
  if (filter === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  } else if (filter === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  // Apply search
  if (searchQuery.trim()) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filteredTodos;

};

// Statistics selector
export const selectTodoStats = (state: { todos: TodoState }) => {
  const todos = state.todos.todos;
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  
  return { total, completed, active };
};

export default todoSlice.reducer;