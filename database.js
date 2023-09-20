import mysql2 from "mysql2";

let connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "expressjs-testing",
});

export async function getUser(username) {
  const [rows] = await connection
    .promise()
    .query("SELECT * FROM users WHERE username = ?");

  return rows[0];
}

export async function createUser(username, password) {
  const { insertId } = await connection
    .promise()
    .query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      password,
    ]);

  return insertId;
}
