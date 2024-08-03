import { env } from "./src/env";
import { app } from "./src/server";

const port = env.PORT || 6000;

app.listen({ port: port }).then((port) => {
  console.log(port);
});
