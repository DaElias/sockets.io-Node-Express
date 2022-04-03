import express, { Application } from "express";
import { createServer } from "http";
import cors from "cors";
import sokectController from "../socket/sokectController";
import path from "path";

class Server {
  private app: Application;
  private port: String | Number;
  private server;
  private io;

  constructor() {
    this.app = express();
    this.port = 8080;
    this.server = createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.middelwares();
    this.socketsEvents();
  }

  middelwares() {
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
    // Directorio Público
    this.app.use(express.static("../public"));
  }

  socketsEvents() {
    sokectController(this.io);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor Corriendo en:  http://localhost:${this.port}/`);
    });
  }
}

export default Server;
