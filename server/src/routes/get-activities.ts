import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { dayjs, prisma } from "../lib";

export async function getActivities(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/activities",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        include: {
          activities: {
            orderBy: {
              occurs_at: "asc",
              title: "asc",
            },
          },
        },
      });

      if (!trip) {
        throw new Error("Trip not found.");
      }

      const diferenceInDaysBetweenTripStartAndEnd = dayjs(trip.ends_at).diff(
        trip.starts_at,
        "day",
      );

      const activities = Array.from({
        length: diferenceInDaysBetweenTripStartAndEnd + 1,
      }).map((_, index) => {
        const date = dayjs(trip.starts_at).add(index, "day");
        return {
          date: date.toDate(),
          activities: trip.activities.filter((activity) =>
            dayjs(activity.occurs_at).isSame(date, "day"),
          ),
        };
      });

      return { activities };
    },
  );
}
