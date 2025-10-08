import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import { useTodos } from "../hooks/useTodos";
import SearchBar from "./SearchBar";
import PaginationControls from "./PaginationControls";
import "./TodoList.css";

export default function TodoList() {
  const { todos, isLoading, error,searchTerm, setTerm, currentPage,limitPerPage,totalTodos,goToNextPage,goToPrevPage,deleteTodo, toggleTodo, addTodo } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="todo-list">
        <h1>Todo List</h1>
        <SearchBar searchTerm = {searchTerm} onChange={setTerm}/>
        <AddTodoForm onAdd={addTodo} />
        <ul style={{ listStyle: "none", padding: 0 }}>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={() => deleteTodo(todo.id)}
                    onToggle={() => toggleTodo(todo.id)}
                />
            ))}
      </ul>
        <PaginationControls
            currentPage={currentPage}
            totalTodos={totalTodos}
            limitPerPage={limitPerPage}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}/>
    </div>
  );
}
