import React, { useState, useCallback, useMemo } from "react";
import "./TodoItem.css";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.todo);

  const handleSave = useCallback(() => {
    const trimmed = editedTitle.trim();
    if (trimmed === "") return;
    onEdit(todo.id, trimmed);
    setIsEditing(false);
  }, [editedTitle, onEdit, todo.id]);

  const handleCancel = useCallback(() => {
    setEditedTitle(todo.todo);
    setIsEditing(false);
  }, [todo.todo]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [onDelete, todo.id]);

  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [onToggle, todo.id]);

  const handleInputChange = useCallback((e) => {
    setEditedTitle(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") handleSave();
  }, [handleSave]);

  const todoTextClass = useMemo(
    () => `todo-text ${todo.completed ? "completed" : ""}`,
    [todo.completed]
  );

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
