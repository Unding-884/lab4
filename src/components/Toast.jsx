import { Box, Alert } from '@mui/material';
import { useNotificationStore } from '../store/useNotificationStore';
import { useEffect } from 'react';

const Toast = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.id) {
        const timer = setTimeout(() => {
          removeNotification(notification.id);
        }, 5000);
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <Box
      component="div"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
      }}
    >
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          severity={notification.type || 'info'}
          onClose={() => removeNotification(notification.id)}
          sx={{
            boxShadow: 2,
            minWidth: 300,
          }}
        >
          {notification.message}
        </Alert>
      ))}
    </Box>
  );
};

export default Toast;
