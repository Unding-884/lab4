import React, { useState } from "react";
import "./AddTodoForm.css";

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  // removed useCallback: internal handlers are cheap and add hook overhead
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd?.(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        placeholder="Add new todo..."
        onChange={handleChange}
        className="todo-form-input"
      />
      <button type="submit" className="todo-form-button">
        Add
      </button>
    </form>
  );
}

export default React.memo(AddTodoForm);
