import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { ClientError } from "./errors";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, _, replay) => {
  if (error instanceof ZodError) {
    return replay.status(400).send({
      message: "Invalid input",
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof ClientError) {
    return replay.status(400).send({
      message: error.message,
    });
  }

  return replay.status(500).send({
    message: "Internal server error",
  });
};
