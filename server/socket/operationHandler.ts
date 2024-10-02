import Delta from "quill-delta";
import { Socket } from "socket.io";
import {getDelta, setServerDelta} from '../controller/socket';

interface msg {
  delta: Delta,
  user: string,
  filename: string
}

var ops: Delta[];

const servdelta=new Delta();

export function operationHandler(socket: Socket) {
  socket.on('message', async (data) => {
    // console.log(data.delta);
    // console.log(data);
    setServerDelta(data.delta);
    const delta=await getDelta(4);
    socket.broadcast.emit('fwd', delta);
  });
}