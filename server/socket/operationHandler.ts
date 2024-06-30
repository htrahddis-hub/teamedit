import { Delta } from "quill/core";
import { Socket } from "socket.io";

interface msg {
  delta: Delta,
  user: string,
  filename: string
}

var ops: Delta[];

export function operationHandler(socket: Socket) {
  socket.on('message', (data) => {
    console.log(data.delta);
    console.log(data);
    socket.broadcast.emit('fwd', data);
  });
}