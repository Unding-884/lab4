import { useEffect, useCallback } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useTodoStore } from '../store/useTodoStore';
import AddTodoFormMUI from '../components/todo/AddTodoFormMUI';
import SearchBarMUI from '../components/todo/SearchBarMUI';
import TodoItemMUI from '../components/todo/TodoItemMUI';
import PaginationControlsMUI from '../components/todo/PaginationControlsMUI';

export default function TodoPage() {
  // Use selective subscriptions to avoid re-renders when unrelated state changes
  const todos = useTodoStore((state) => state.todos);
  const isLoading = useTodoStore((state) => state.isLoading);
  const error = useTodoStore((state) => state.error);
  const searchTerm = useTodoStore((state) => state.searchTerm);
  const currentPage = useTodoStore((state) => state.currentPage);
  const limitPerPage = useTodoStore((state) => state.limitPerPage);
  const totalTodos = useTodoStore((state) => state.totalTodos);
  
  // Actions - these are stable references
  const setSearchTerm = useTodoStore((state) => state.setSearchTerm);
  const fetchTodos = useTodoStore((state) => state.fetchTodos);
  const goToNextPage = useTodoStore((state) => state.goToNextPage);
  const goToPrevPage = useTodoStore((state) => state.goToPrevPage);
  const changeLimit = useTodoStore((state) => state.changeLimit);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodoTitle = useTodoStore((state) => state.editTodoTitle);
  const clearError = useTodoStore((state) => state.clearError);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="text.primary" sx={{ mb: 3 }}>
        Todo List with MUI & Zustand
      </Typography>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <AddTodoFormMUI onAdd={addTodo} />

      <SearchBarMUI searchTerm={searchTerm} onChange={setSearchTerm} />

      {todos.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="body1" color="text.secondary">
            {searchTerm ? 'No todos found matching your search.' : 'No todos yet. Add one above!'}
          </Typography>
        </Box>
      ) : (
        <Box>
          {todos.map((todo) => (
            <TodoItemMUI
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodoTitle}
            />
          ))}
        </Box>
      )}

      <PaginationControlsMUI
        currentPage={currentPage}
        totalTodos={totalTodos}
        limitPerPage={limitPerPage}
        onNextPage={goToNextPage}
        onPrevPage={goToPrevPage}
        onChangeLimit={changeLimit}
      />
    </Box>
  );
}