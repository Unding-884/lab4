import React, { useCallback } from "react";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import { useTodos } from "../hooks/useTodos";
import SearchBar from "./SearchBar";
import PaginationControls from "./PaginationControls";
import "./TodoList.css";

export default function TodoList() {
  const { 
    todos, 
    isLoading, 
    error,
    searchTerm, 
    setTerm, 
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    deleteTodo, 
    toggleTodo, 
    addTodo, 
    editTodoTitle 
  } = useTodos();

  // Keep callbacks passed to children memoized so prop references stay stable
  const handleDeleteTodo = useCallback((id) => {
    deleteTodo(id);
  }, [deleteTodo]);

  const handleToggleTodo = useCallback((id) => {
    toggleTodo(id);
  }, [toggleTodo]);

  const handleEditTodo = useCallback((id, title) => {
    editTodoTitle(id, title);
  }, [editTodoTitle]);

  const stableAddTodo = useCallback((todoText) => {
    addTodo(todoText);
  }, [addTodo]);

  // do not memoize todos or pagination props aggressively — pass primitives/handlers directly
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <SearchBar searchTerm={searchTerm} onChange={setTerm} />
      <AddTodoForm onAdd={stableAddTodo} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
            onEdit={handleEditTodo}
          />
        ))}
      </ul>
      <PaginationControls
        currentPage={currentPage}
        totalTodos={totalTodos}
        limitPerPage={limitPerPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      />
    </div>
  );
}
