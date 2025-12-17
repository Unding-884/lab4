import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

function PaginationControlsMUI({ 
  currentPage, 
  totalTodos, 
  limitPerPage, 
  onNextPage, 
  onPrevPage,
  onChangeLimit 
}) {
  const totalPages = Math.ceil(totalTodos / limitPerPage) || 1;
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 3, bgcolor: 'background.paper' }}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="outlined"
            onClick={onPrevPage}
            disabled={isPrevDisabled}
            startIcon={<ArrowBack />}
          >
            Previous
          </Button>
          
          <Typography variant="body1" sx={{ mx: 2, color: 'text.primary' }}>
            Page {currentPage} of {totalPages}
          </Typography>
          
          <Button
            variant="outlined"
            onClick={onNextPage}
            disabled={isNextDisabled}
            endIcon={<ArrowForward />}
          >
            Next
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Total: {totalTodos} todos
          </Typography>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Per Page</InputLabel>
            <Select
              value={limitPerPage}
              label="Per Page"
              onChange={(e) => onChangeLimit(e.target.value)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default React.memo(PaginationControlsMUI);
