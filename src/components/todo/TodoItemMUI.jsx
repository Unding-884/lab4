import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Checkbox, 
  IconButton, 
  Typography, 
  TextField,
  Box,
  Stack,
  FormControlLabel
} from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';

function TodoItemMUI({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.todo);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <Card 
      elevation={2} 
      sx={{ 
        mb: 2, 
        bgcolor: 'background.paper',
        '&:hover': { elevation: 4 }
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                color="primary"
              />
            }
            label={
              isEditing ? null : (
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                    ml: 1,
                  }}
                >
                  {todo.todo}
                </Typography>
              )
            }
            sx={{ flex: 1, m: 0 }}
          />

          {isEditing && (
            <TextField
              fullWidth
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              size="small"
              sx={{ flexGrow: 1 }}
              aria-label="Edit todo text"
            />
          )}

          <Box>
            {isEditing ? (
              <>
                <IconButton 
                  onClick={handleSave} 
                  color="primary" 
                  size="small"
                  aria-label="save"
                >
                  <Save />
                </IconButton>
                <IconButton 
                  onClick={handleCancel} 
                  color="secondary" 
                  size="small"
                  aria-label="cancel"
                >
                  <Cancel />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton 
                  onClick={() => setIsEditing(true)} 
                  color="primary" 
                  size="small"
                  aria-label="edit"
                >
                  <Edit />
                </IconButton>
                <IconButton 
                  onClick={() => onDelete(todo.id)} 
                  color="error" 
                  size="small"
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
              </>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Memoize to prevent re-renders when props haven't changed
export default React.memo(TodoItemMUI);
