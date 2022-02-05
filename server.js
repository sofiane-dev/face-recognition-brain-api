import express from "express";

const app = express();
app.use(express.json());
app.listen("8080");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signin", (req, res) => {
  console.log(req.body)
  res.send("signin");
});
