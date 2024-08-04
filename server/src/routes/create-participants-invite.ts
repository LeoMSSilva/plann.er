import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../env";
import { ClientError } from "../errors";
import { formattedDate, prisma, sendMail } from "../lib";
import { mailConfirmTrip } from "../templates";

export async function createParticipantsInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/invites",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
      },
    },

    async (request) => {
      const { tripId } = request.params;
      const { name, email } = request.body;

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      });

      if (!trip) {
        throw new ClientError("Trip not found.");
      }

      const participant = await prisma.participant.create({
        data: {
          name,
          email,
          tripId,
        },
      });

      await sendMail({
        to: {
          name: participant.name,
          address: participant.email,
        },
        subject: `Confirme sua participação na viagem para ${trip.destination}`,
        html: mailConfirmTrip({
          participantName: participant.name,
          formattedStartDate: formattedDate(trip.starts_at),
          formattedEndDate: formattedDate(trip.ends_at),
          destination: trip.destination,
          confirmationLink: `${env.API_BASE_URL}/participants/${participant.id}/confirm`,
        }),
      });

      return { participantId: participant.id };
    },
  );
}
