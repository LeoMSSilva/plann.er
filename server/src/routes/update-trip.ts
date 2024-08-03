import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../env";
import { dayjs, formattedDate, prisma, sendMail } from "../lib";
import { mailConfirmUpdateTrip } from "../templates";

export async function updateTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/trips/:tripId",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;
      const { destination, starts_at, ends_at } = request.body;

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

      if (dayjs(starts_at).isBefore(new Date())) {
        throw new Error(
          "Invalid trip start date. It cannot be less than today.",
        );
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new Error(
          "Invalid trip end date. It cannot be smaller than the initial.",
        );
      }

      const tripUpdated = await prisma.trip.update({
        where: {
          id: tripId,
        },
        data: {
          destination,
          starts_at,
          ends_at,
        },
      });

      await Promise.all(
        trip.participants.map(async (participant) => {
          await sendMail({
            to: {
              name: participant.name,
              address: participant.email,
            },
            subject: `Confirme sua participação na viagem para ${tripUpdated.destination}`,
            html: mailConfirmUpdateTrip({
              participantName: participant.name,
              formattedStartDate: formattedDate(tripUpdated.starts_at),
              formattedEndDate: formattedDate(tripUpdated.ends_at),
              destination: tripUpdated.destination,
              confirmationLink: `${env.API_BASE_URL}/participants/${participant.id}/confirm`,
              isConfirmed: participant.is_confirmed,
            }),
          });
        }),
      );

      return { tripId: trip.id };
    },
  );
}
