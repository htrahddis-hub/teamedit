import Delta from "quill-delta";
import { DefaultEventsMap, Server, Socket} from "socket.io";
import {getDelta, setServerDelta} from '../controller/socket';

interface msg {
  delta: Delta,
  user: string,
  filename: string
}

var ops: Delta[];

const servdelta=new Delta();

export function operationHandler(socket: Socket,io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {

  socket.on('message', async (data) => {
    console.log(data);
    socket.to(data.roomId).emit('fwd', data.delta);
  });
  socket.on('message1', async (data) => {
    console.log(data.delta);
    console.log(data.roomId);
    socket.to(data.roomId).emit('fwd1', data.delta);
  });
}