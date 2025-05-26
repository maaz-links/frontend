import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

let echoInstance = null;

export const initializeEcho = () => {
  // Disconnect existing instance if it exists
  if (echoInstance) {
    echoInstance.disconnect();
  }

  // Get fresh token from localStorage
  const token = localStorage.getItem('ACCESS_TOKEN');

  // Initialize new Echo instance
  echoInstance = new Echo({
    broadcaster: 'pusher',
    key: '5a7756c9ab1d786d2015',
    cluster: 'eu',
    forceTLS: true,
    encrypted: true,
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  });

  return echoInstance;
};

// Export the initialized instance (or null if not yet initialized)
export const getEcho = () => echoInstance;