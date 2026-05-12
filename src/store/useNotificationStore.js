import { create } from 'zustand';

export const useNotificationStore = create((set) => {
  let notificationId = 0;

  return {
    notifications: [],

    addNotification: (message, type = 'info', duration = 5000) => {
      const id = notificationId++;
      const notification = { id, message, type };

      set((state) => ({
        notifications: [...state.notifications, notification],
      }));

      if (duration > 0) {
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }));
        }, duration);
      }

      return id;
    },

    removeNotification: (id) =>
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),

    clearAllNotifications: () =>
      set({
        notifications: [],
      }),
  };
});
