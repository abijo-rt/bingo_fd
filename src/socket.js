import { io } from "socket.io-client";

const socket_url = 'http://localhost:3000';

const socket = io ( socket_url )

export default socket;