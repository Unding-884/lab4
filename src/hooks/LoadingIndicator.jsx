import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingIndicator = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        minHeight: 300,
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <CircularProgress />
      <Typography
        variant="body1"
        component="span"
        sx={{ textAlign: 'center', color: 'text.secondary' }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingIndicator;
