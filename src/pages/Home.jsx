import { Typography, Paper, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export default function Home() {
  return (
    <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
      <Typography variant="h3" gutterBottom color="text.primary">
        Final Project
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        This is a React SPA demonstrating modern React development with Material UI, routing, and state management.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom color="text.primary">
          Technologies used:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Material UI (MUI)" 
              secondary="UI components and theming"
              primaryTypographyProps={{ color: 'text.primary' }}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="React Router" 
              secondary="Client-side navigation"
              primaryTypographyProps={{ color: 'text.primary' }}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Zustand" 
              secondary="Global state management with persistence"
              primaryTypographyProps={{ color: 'text.primary' }}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
}