import { ToastAndroid } from 'react-native';

export const showToast = (message, time = 'SHORT') => {
  const duration = time === 'SHORT' ? ToastAndroid.SHORT : ToastAndroid.LONG;
  ToastAndroid.show(message, duration);
};
