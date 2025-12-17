import { Typography, Paper, Box } from '@mui/material';
import TodoList from '../components/TodoList';

export default function Lab4() {
  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Lab 4 - Original Todo List
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is the original implementation with custom CSS styling.
        </Typography>
      </Paper>
      <TodoList />
    </Box>
  );
}