import { useState, useEffect } from "react";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setTerm] = useState("");
  const [currentPage, setPage] = useState(1);
  const [limitPerPage, setLimit] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsLoading(true);
        const skip = (currentPage -1) * limitPerPage;
        const res = await fetch(`${API_URL}?limit=${limitPerPage}&skip=${skip}`);
        if (!res.ok) throw new Error("Failed to fetch todos");
        const data = await res.json();
        setAllTodos(data.todos);
        setTodos(data.todos);
        setTotalTodos(data.total);
      }
      catch (err) {
        setError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchTodos();
  }, [currentPage, limitPerPage]); // remove currentPage, limitPerPage for one call

  useEffect(() => {
    const filtered = allTodos.filter(todo => todo.todo.toLowerCase().includes(searchTerm.toLowerCase()));
    setTodos(filtered);
  }, [searchTerm, allTodos]);

  function goToNextPage() {
    const totalPages = Math.ceil(totalTodos / limitPerPage);
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  }

  function goToPrevPage(){
    if(currentPage > 1) {
      setPage(currentPage - 1)
    }
  }

  function changeLimit(limit){
    setLimit(limit);  ``
    setPage(1);
  }

const editTodoTitle = async (id, newTitle) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: newTitle }),
    });

    let updated = null;
    try {
      updated = await res.json();
    } catch {
      updated = { todo: newTitle }; // fallback if no JSON body
    }

    if (!res.ok) throw new Error("Failed to update todo title");

    setAllTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, todo: updated.todo } : todo));
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, todo: updated.todo } : todo));
  } catch (err) { //update todo locally
    setError(err.message);
    setAllTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, todo: newTitle } : todo));
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, todo: newTitle } : todo));
  }
};


  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))); //delete todo locally
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
      if (res.ok) {
        const updated = await res.json();
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: updated.completed } : t))
        );
      } else {
        // toggle todo locally
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Add todo locally da
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), //milliseconds since 1970
      todo: text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  return { todos,allTodos, isLoading, error,searchTerm, setTerm, currentPage,limitPerPage,totalTodos,goToNextPage,goToPrevPage,changeLimit,editTodoTitle, deleteTodo, toggleTodo, addTodo };
}
