import express, { Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import Router from "express-promise-router";
import * as dotenv from 'dotenv'
import { initializeUser, initializeUserProfile } from "./user";
import { wishRouter } from "./routes/wish";
dotenv.config();
const port = process.env.SERVER_PORT || 9001;
const app = express();
const apiRouter = Router();

// (async () => {
//   if (process.env.NODE_ENV === "test") {
//     console.log(window);
//     await window.__mockServerReady;
//   }
// })();

app.use(morgan("tiny"));
app.use(express.static("./dist"));
app.use(express.json());

// app.get('/', (request, response) => {
//   response.sendFile(__dirname + '/views/index.html');
// });
// apiRouter.use((_, __, next) => {
//   console.log("api routes");
//   next();
// });

apiRouter.get("/health", (_: Request, res: Response) => {
  const status = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };

  try {
    res.send(status);
  } catch (e: any) {
    status.message = e;
    res.status(503).send("Down");
  }
});

app.use("/api", apiRouter, wishRouter);

// Skip server listener when execute in test environment
if (process.env.NODE_ENV !== "test") {
  initializeUser();
  initializeUserProfile();

  app.listen(port, function () {
    console.log(`Your app is listening on port ${port}`);
  });
}

export { app };
