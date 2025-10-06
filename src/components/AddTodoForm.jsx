import { useState } from "react";
import "./AddTodoForm.css";

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className = "todo-form">
      <input
        type="text"
        value={text}
        placeholder="Add new todo..."
        onChange={(e) => setText(e.target.value)}
        className="todo-form-input"
      />
      <button type="submit" className="todo-form-button">
        Add
      </button>
    </form>
  );
}
