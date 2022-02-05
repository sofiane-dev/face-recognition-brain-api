import express from "express";

const app = express();

app.listen("8080");

app.get("/", (req, resp) => {
  resp.send("Hello World!");
});
