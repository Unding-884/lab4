import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import { useTodos } from "../hooks/useTodos";
import "./TodoList.css";

export default function TodoList() {
  const { todos, isLoading, error, deleteTodo, toggleTodo, addTodo } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="todo-list" style={{}}>
      <h1>Todo List</h1>
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
    </div>
  );
}
