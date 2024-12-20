import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { ClientError } from "../errors";
import { dayjs, prisma } from "../lib";

export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/activities",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().min(4),
          occurs_at: z.coerce.date(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;
      const { occurs_at, title } = request.body;

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      });

      if (!trip) {
        throw new ClientError("Trip not found.");
      }

      if (
        dayjs(occurs_at).isBefore(trip.starts_at) ||
        dayjs(occurs_at.getDate()).isAfter(trip.ends_at)
      ) {
        throw new ClientError(
          "Invalid activity date. Date must be between trip dates.",
        );
      }

      const activity = await prisma.activity.create({
        data: {
          title,
          occurs_at,
          tripId,
        },
      });

      return { activityId: activity.id };
    },
  );
}
