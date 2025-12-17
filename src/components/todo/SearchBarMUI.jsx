import React from 'react';
import { TextField, Paper, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

function SearchBarMUI({ searchTerm, onChange }) {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
      <TextField
        fullWidth
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search todos..."
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
}

export default React.memo(SearchBarMUI);
