import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function createNotification(type, title, message, time) {//provides a function to create notifications with
  switch (type) {
    case 'info':
      NotificationManager.info(message, title, time);
      break;
    case 'success':
      NotificationManager.success(message, title, time);
      break;
    case 'warning':
      NotificationManager.warning(message, title, time);
      break;
    case 'error':
      NotificationManager.error(message, title, time);
      break;
  }
};


export default createNotification;