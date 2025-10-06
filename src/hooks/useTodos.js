import { useState, useEffect } from "react";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch todos");
        const data = await res.json();
        setTodos(data.todos);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const updated = await res.json();
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: updated.completed } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new todo (client-side only)
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), //milliseconds since 1970
      todo: text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  return { todos, isLoading, error, deleteTodo, toggleTodo, addTodo };
}
