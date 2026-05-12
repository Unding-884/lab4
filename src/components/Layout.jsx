import { Outlet} from 'react-router-dom';
import { Box, Container, Button } from '@mui/material';
import AppBar from './AppBar.jsx';
import { useAccessibleRouting } from '../hooks/useAccessibleRouting';

export default function Layout() {
  const { mainHeadingRef } = useAccessibleRouting();

  const handleSkipToContent = () => {
    mainHeadingRef.current?.focus();
    mainHeadingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Skip to main content link */}
      <Button
        onClick={handleSkipToContent}
        sx={{
          position: 'absolute',
          top: -40,
          left: 0,
          padding: 1,
          backgroundColor: 'primary.main',
          color: 'white',
          textDecoration: 'none',
          zIndex: 100,
          '&:focus': {
            top: 0,
          },
        }}
      >
        Skip to main content
      </Button>

      <AppBar position="static" />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Box
          ref={mainHeadingRef}
          component="div"
          tabIndex={-1}
          sx={{ outline: 'none' }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}