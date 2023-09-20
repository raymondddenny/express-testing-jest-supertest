import express from "express";
import database from "./database";

export default function (database) {
  if (!database) {
    throw new Error("Database parameter is required.");
  }
  const app = express();

  app.use(express.json());

  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  app.post("/users", async (req, res) => {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        res.status(400).send();
        return;
      }

      const user = await database.getUser(username);

      if (user) {
        res.status(409).send({ errorMsg: "Username already exists" });
        return;
      }

      const userId = await database.createUser(username, password);

      res.status(201).send({
        userId: userId,
      });
    } catch (error) {
      res.status(500).send({ errorMsg: `Something went wrong -> ${error}` });
      return;
    }
  });

  return app;
}
