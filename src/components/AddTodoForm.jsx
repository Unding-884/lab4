import React, { useState, useCallback } from "react";
import "./AddTodoForm.css";

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = text.trim();
      if (!trimmed) return;
      onAdd(trimmed);
      setText("");
    },
    [text, onAdd]
  );

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
