import { Manager, Socket } from "socket.io-client";

export const socketCB = function (user: string): Socket {
  const manager = new Manager("http://localhost:3000", {
    autoConnect: true,
    query: { 'myusername_key': user },
  });
  const socket = manager.socket("/");
  return socket;
}
