import { useState, useCallback } from 'react';
import { Notification } from '../types/post';

export function useNotifications(initialNotifications: Notification[] = []) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    markAsRead,
    clearNotifications,
  };
}