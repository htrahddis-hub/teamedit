import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors, { CorsRequest } from 'cors';
import bodyParser from "body-parser";
import router from './routes';
import dotenv from "dotenv";
import { prisma } from "./prisma";
import { createFileSocket } from "./controller/file";
import { Delta } from "quill/core";
import { operationHandler } from "./socket/operationHandler";

const app = express();
const httpServer = createServer(app);
dotenv.config();
const url = process.env.CONNECTION_URL || "";
const PORT = process.env.PORT || 3000;


export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001"
  }
});

app.use(cors<CorsRequest>({ origin: 'http://localhost:3001', credentials: true }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.get("/", (req, res) => {
  res.send("hello world");
});
app.use('/auth', router);

// var fileData: Array<Delta> = [];

io.on("connection", (socket) => {
  console.log(io.engine.clientsCount + "on connect");
  console.log(socket.id);
  console.log(socket.handshake.query.myusername_key);


  socket.on('disconnect', () => {
    console.log(io.engine.clientsCount + "on disconnect");
    console.log(socket.id);
  });
  socket.on('check', () => {
    console.log(io.engine.clientsCount + "no of sockets");
    console.log(socket.id);
  });


  
    operationHandler(socket);
  

  socket.on("join room", (data) => {
    socket.join(data.room);
  });



  socket.on("createFile", (data) => {
    console.log(data.user);
    console.log(data.fileName);
    createFileSocket(data.fileName, data.user).then((data) => console.log(data));
  });

});

httpServer.listen(PORT, () => console.log(`Server running on port: ${PORT}`));