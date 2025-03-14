import { io } from "socket.io-client";

const socket_url = 'http://192.168.137.1:3000';

const socket = io ( socket_url )

export default socket;