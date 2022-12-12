import express from 'express'
import routes from './routes'
import http from "http";

const server = express()
const StartServer = () => {
    server.use((req, res, next) => {
      console.log(
        `Request -> ${req.method} | IP -> ${req.socket.remoteAddress}`
      );
      res.on("finish", () => {
        console.log(
          `Done! URL -> ${req.url} | IP -> ${req.socket.remoteAddress} | Status -> ${res.statusCode}`
        );
      });
      next();
    });
  
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
      }
  
      next();
    });
    server.use("/api", routes);
    server.get("/ping", (req, res, next) => {
      res.status(200).json({ message: "pong" });
    });
    server.use((req, res, next) => {
      console.log("Route - Not found");
      return res.status(404).json({ message: "Route - Not Found" });
    });
    http.createServer(server).listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  };
  
  StartServer()