import { Typography, Paper, Box } from '@mui/material';

export default function Home() {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Student Portfolio
      </Typography>
      <Typography variant="body1" paragraph>
        This is a React SPA demonstrating modern React stack with MUI, React Router, and Zustand.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          Technologies used:
        </Typography>
        <ul>
          <li>Material UI (MUI) - UI components</li>
          <li>React Router - Navigation</li>
          <li>Zustand - State management</li>
          <li>Dark/Light theme toggle</li>
        </ul>
      </Box>
    </Paper>
  );
}