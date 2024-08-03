import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../env";
import { prisma } from "../lib";

export async function confirmParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/participants/:participantId/confirm",
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
      },
    },

    async (request, replay) => {
      const { participantId } = request.params;

      const participant = await prisma.participant.findUnique({
        where: { id: participantId },
      });

      if (!participant) {
        throw new Error("Participant not found.");
      }

      if (participant.is_confirmed) {
        return replay.redirect(
          `${env.WEB_BASE_URL}/trips/${participant.tripId}`,
        );
      }

      await prisma.participant.update({
        where: { id: participantId },
        data: { is_confirmed: true },
      });

      return replay.redirect(`${env.WEB_BASE_URL}/trips/${participant.tripId}`);
    },
  );
}
