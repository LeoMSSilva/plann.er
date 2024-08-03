import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../env";
import { formattedDate, prisma, sendMail } from "../lib";
import { mailConfirmTrip } from "../templates";

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/confirm",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },

    async (request, replay) => {
      const { tripId } = request.params;

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        include: {
          participants: {
            where: {
              is_owner: false,
            },
          },
        },
      });

      if (!trip) {
        throw new Error("Trip not found.");
      }

      if (trip.is_confirmed) {
        return replay.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`);
      }

      await prisma.trip.update({
        where: { id: tripId },
        data: { is_confirmed: true },
      });

      await Promise.all(
        trip.participants.map(async (participant) => {
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
        }),
      );

      return replay.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`);
    },
  );
}
