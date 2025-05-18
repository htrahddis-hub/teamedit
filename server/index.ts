import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors, { CorsRequest } from 'cors';
import bodyParser from "body-parser";
import router from './routes';
import dotenv from "dotenv";
import { prisma } from "./prisma";
import jwt from "jsonwebtoken";
import { createFileSocket } from "./controller/file";
// import { Delta } from "quill/core";
import { operationHandler } from "./socket/operationHandler";
// import { saveRedis } from "./redis";

const app = express();
const httpServer = createServer(app);
dotenv.config();
const url = process.env.CONNECTION_URL || "";
const PORT = process.env.PORT || 3000;


export const io = new Server(httpServer, {
  cors: {
    origin: url
  }
});

app.use(cors<CorsRequest>({ origin: url, credentials: true }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.get("/", (req, res) => {
  res.send("hello world");
});
app.use('/auth', router);

// var fileData: Array<Delta> = [];

app.get("/rooms", (req, res) => {
  console.log(io.sockets.adapter.rooms);
  res.send(JSON.stringify(io.sockets.adapter.rooms));
});

async function isValidToken(token: string): Promise<boolean> {
  try {
    // const token = req.headers?.authorization as string;

    if (token.startsWith("Bearer")) {

      const decoded: any = jwt.verify(token.substring(7), process.env.TOP_SECRET as string);
      const User = await prisma.user.findUnique({
        where: {
          id: decoded.User_Id,
        },
      });
      // console.log(User?.token);
      // console.log(token.substring(7));

      if (User?.token === token.substring(7)) {
        return true;
      }
      else
        return false;
    }
    else
      return false;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

io.on("connection", (socket) => {
  console.log(io.engine.clientsCount + " on connect ");
  console.log(socket.handshake.query);
  const roomId: string = socket.handshake.query.filename + "_" + socket.handshake.query.id;
  if (socket.handshake.query.filename) {
    socket.on('authenticate', async (data) => {
      console.log(data);
      if (await isValidToken(data.token)) {
        socket.join(socket.handshake.query.filename + "_" + socket.handshake.query.id);
        console.log("room joined");
        setTimeout(() => socket.emit('joined', { roomId: roomId }), 300);
      } else {
        socket.disconnect();
      }
    });
  }
  socket.on('disconnect', () => {
    console.log(io.engine.clientsCount + " on disconnect");
    console.log(socket.id);
  });
  operationHandler(socket, io);


  // socket.on('message', async (data) => {
  //   console.log(data);
  // });

  // socket.on('openFile',()=>{
  //   console.log("data");
  //   socket.emit('test',{hello:"world"});
  //   // saveRedis();
  // });
  // socket.on("createFile", (data) => {
  //   console.log(data.user);
  //   console.log(data.fileName);
  //   createFileSocket(data.fileName, data.user).then((data) => console.log(data));
  // });

  // socket.on("join room", (data) => {
  //   socket.join(data.room);
  // }); 

});

httpServer.listen(PORT, () => console.log(`Server running on port: ${PORT}`));