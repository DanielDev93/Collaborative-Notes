import io from 'socket.io-client';

// Create a socket connection
export const socket = io("http://localhost:3001"); // server URL