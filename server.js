import express from "express";
import cors from "cors";
import knex from "knex";
import "dotenv/config";
import register from "./controllers/register.js";
import signIn from "./controllers/signIn.js";
import updateRank from "./controllers/rank.js";
import faceDetection from "./controllers/faceDetection.js";
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: "1234",
    user: "postgres",
    password: "secret",
    database: "frb",
  },
});

const app = express();
app.use(cors(), express.json());
app.listen("8080");

app.post("/register", register(db));
app.post("/signin", signIn(db));
app.post("/updateRank", updateRank(db));
app.post("/face-detection", faceDetection);
