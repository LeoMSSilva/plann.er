import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import {
  confirmParticipant,
  confirmTrip,
  createActivity,
  createTrip,
} from "./routes";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(confirmParticipant);
app.register(confirmTrip);
app.register(createActivity);
app.register(createTrip);

app.get("/", () => "Hello world!");
