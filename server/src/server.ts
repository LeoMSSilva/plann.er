import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import {
  confirmParticipant,
  confirmTrip,
  createActivity,
  createLink,
  createParticipantsInvite,
  createTrip,
  getActivities,
  getLinks,
  getParticipant,
  getParticipants,
  getTrip,
  updateTrip,
} from "./routes";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(cors, {
  origin: "*",
});

app.register(confirmParticipant);
app.register(confirmTrip);
app.register(createActivity);
app.register(createLink);
app.register(createParticipantsInvite);
app.register(createTrip);
app.register(getActivities);
app.register(getLinks);
app.register(getTrip);
app.register(getParticipant);
app.register(getParticipants);
app.register(updateTrip);

app.get("/", () => "Hello Plann.er!");
