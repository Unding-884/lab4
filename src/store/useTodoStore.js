import { create } from 'zustand';

const API_URL = "https://dummyjson.com/todos";

export const useTodoStore = create((set, get) => ({
  // State
  allTodos: [],
  todos: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  currentPage: 1,
  limitPerPage: 10,
  totalTodos: 0,

  // Actions
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    const { allTodos } = get();
    const filtered = allTodos.filter(todo => 
      todo.todo.toLowerCase().includes(term.toLowerCase())
    );
    set({ todos: filtered });
  },

  fetchTodos: async () => {
    const { currentPage, limitPerPage } = get();
    set({ isLoading: true, error: null });
    
    try {
      const skip = (currentPage - 1) * limitPerPage;
      const res = await fetch(`${API_URL}?limit=${limitPerPage}&skip=${skip}`);
      if (!res.ok) throw new Error("Failed to fetch todos");
      
      const data = await res.json();
      set({ 
        allTodos: data.todos, 
        todos: data.todos, 
        totalTodos: data.total,
        isLoading: false 
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  goToNextPage: () => {
    const { currentPage, totalTodos, limitPerPage, fetchTodos } = get();
    const totalPages = Math.ceil(totalTodos / limitPerPage) || 1;
    if (currentPage < totalPages) {
      set({ currentPage: currentPage + 1 });
      fetchTodos();
    }
  },

  goToPrevPage: () => {
    const { currentPage, fetchTodos } = get();
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1 });
      fetchTodos();
    }
  },

  changeLimit: (limit) => {
    set({ limitPerPage: limit, currentPage: 1 });
    get().fetchTodos();
  },

  addTodo: (text) => {
    const newTodo = {
      id: Date.now(),
      todo: text,
      completed: false,
      userId: 1,
    };
    set((state) => ({ 
      todos: [newTodo, ...state.todos],
      allTodos: [newTodo, ...state.allTodos]
    }));
  },

  toggleTodo: async (id) => {
    const { todos } = get();
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    // Optimistic update
    set((state) => ({
      todos: state.todos.map((t) => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
      allTodos: state.allTodos.map((t) => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      
      if (!res.ok) throw new Error("Failed to toggle todo");
    } catch (err) {
      // Revert on error
      set((state) => ({
        todos: state.todos.map((t) => 
          t.id === id ? { ...t, completed: todo.completed } : t
        ),
        allTodos: state.allTodos.map((t) => 
          t.id === id ? { ...t, completed: todo.completed } : t
        ),
        error: err.message,
      }));
    }
  },

  deleteTodo: async (id) => {
    // Optimistic delete
    const { todos, allTodos } = get();
    const deletedTodo = todos.find((t) => t.id === id);
    
    set({
      todos: todos.filter((t) => t.id !== id),
      allTodos: allTodos.filter((t) => t.id !== id),
    });

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch (err) {
      // Revert on error
      if (deletedTodo) {
        set((state) => ({
          todos: [...state.todos, deletedTodo],
          allTodos: [...state.allTodos, deletedTodo],
          error: err.message,
        }));
      }
    }
  },

  editTodoTitle: async (id, newTitle) => {
    const { todos, allTodos } = get();
    const oldTodo = todos.find((t) => t.id === id);
    
    // Optimistic update
    set({
      todos: todos.map((t) => 
        t.id === id ? { ...t, todo: newTitle } : t
      ),
      allTodos: allTodos.map((t) => 
        t.id === id ? { ...t, todo: newTitle } : t
      ),
    });

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTitle }),
      });

      if (!res.ok) throw new Error("Failed to update todo");
    } catch (err) {
      // Revert on error
      if (oldTodo) {
        set((state) => ({
          todos: state.todos.map((t) => 
            t.id === id ? { ...t, todo: oldTodo.todo } : t
          ),
          allTodos: state.allTodos.map((t) => 
            t.id === id ? { ...t, todo: oldTodo.todo } : t
          ),
          error: err.message,
        }));
      }
    }
  },

  clearError: () => set({ error: null }),
}));
