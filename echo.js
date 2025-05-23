import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: '5a7756c9ab1d786d2015',
    cluster: 'eu',
    forceTLS: true,
});

echo.connector.pusher.connection.bind('state_change', (states) => {
    console.log('Connection state changed:', states);
});

echo.connector.pusher.connection.bind('connected', () => {
    console.log('Connected to Reverb!');
});

export default echo;
