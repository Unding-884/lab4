import React, { useState } from "react";
import "./TodoItem.css";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.todo);

  // internal handlers are simple; remove useCallback to avoid unnecessary hook overhead
  const handleSave = () => {
    const trimmed = editedTitle.trim();
    if (trimmed === "") return;
    onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.todo);
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(true);

  const handleDelete = () => onDelete(todo.id);

  const handleToggle = () => onToggle(todo.id);

  const handleInputChange = (e) => setEditedTitle(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  // class string is cheap to compute inline
  const todoTextClass = `todo-text ${todo.completed ? "completed" : ""}`;

  return (
    <li className="todo-item-container">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="edit-input"
          />
        ) : (
          <span className={todoTextClass}>{todo.todo}</span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default React.memo(TodoItem);
