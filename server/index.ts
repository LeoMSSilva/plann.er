import { app } from "./src/server";

const port = 3333;

app.listen({ port: port }).then((port) => {
	console.log(port);
});
