import makeApp from "./app";
import database from "./database";

const app = makeApp(database);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
