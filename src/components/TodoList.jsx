import React, { useCallback, useMemo } from "react";
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

  const handleDeleteTodo = useCallback((id) => {
    deleteTodo(id);
  }, [deleteTodo]);

  const handleToggleTodo = useCallback((id) => {
    toggleTodo(id);
  }, [toggleTodo]);

  const memoizedTodos = useMemo(() => todos, [todos]);

  const paginationProps = useMemo(() => ({
    currentPage,
    totalTodos,
    limitPerPage,
    goToNextPage,
    goToPrevPage
  }), [currentPage, totalTodos, limitPerPage, goToNextPage, goToPrevPage]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <SearchBar searchTerm={searchTerm} onChange={setTerm}/>
      <AddTodoForm onAdd={addTodo} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {memoizedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
            onEdit={editTodoTitle}
          />
        ))}
      </ul>
      <PaginationControls {...paginationProps} />
    </div>
  );
}
