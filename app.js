import express from "express";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/users", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send();
    return;
  }
  res.status(201).send({
    userId: 1,
  });
});

export default app;
