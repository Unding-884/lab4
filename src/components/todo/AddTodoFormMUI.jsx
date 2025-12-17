import React, { useState } from 'react';
import { TextField, Button, Paper, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

function AddTodoFormMUI({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add new todo..."
            variant="outlined"
            size="medium"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{ minWidth: '120px' }}
          >
            Add
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default React.memo(AddTodoFormMUI);
