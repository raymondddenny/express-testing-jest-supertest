import request from "supertest";

import app from "./app";

describe("POST /users", () => {
  describe("given a username and password", () => {
    // should save the username and password to the database

    // should respond with a status code of 201
    test("should respond with 201 status code", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });

      expect(response.statusCode).toBe(201);
    });
    // should specify json in the content type header
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // should respond with a json object containing user id
    test("should respond with a json object containing user id", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });

      expect(response.body.userId).toBeDefined();
    });
  });

  describe("when the username or password is missing", () => {
    // should respond with a status code of 422
    test("should respond with a status code of 400", async () => {
      const bodyData = [{ username: "username" }, { password: "password" }, {}];

      for (let body of bodyData) {
        const response = await request(app).post("/users").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
