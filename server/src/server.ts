import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import {
  confirmParticipant,
  confirmTrip,
  createActivity,
  createLink,
  createTrip,
  getActivities,
  getLinks,
  getParticipants,
} from "./routes";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(confirmParticipant);
app.register(confirmTrip);
app.register(createActivity);
app.register(createLink);
app.register(createTrip);
app.register(getActivities);
app.register(getLinks);
app.register(getParticipants);

app.get("/", () => "Hello world!");
