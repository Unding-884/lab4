import "./TodoItem.css";

export default function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li
        className="todo-item-container"
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        color: todo.completed ? "gray" : "aliceblue"
      }}
    >
      <label className="todo-item">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        {todo.todo}
      </label>
      <button onClick={onDelete} className="todo-item-delete-button" style={{color: todo.completed ? "gray":"aqua"}}>
        Delete
      </button>
    </li>
  );
}
