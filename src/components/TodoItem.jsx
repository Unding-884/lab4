import React, { useState } from "react";
import "./TodoItem.css";

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.todo);

  // Save the edited title
  const handleSave = () => {
    if (editedTitle.trim() === "") return;
    onEdit(todo.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <li className="todo-item-container">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        {isEditing ? (<input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            className="edit-input"/>)
            :
            (<span className={`todo-text ${todo.completed ? "completed" : ""}`}>
            {todo.todo}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave} >
              Save
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setEditedTitle(todo.todo);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-btn" onClick={onDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
