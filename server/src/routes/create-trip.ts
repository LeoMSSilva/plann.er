import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
          participants: z.array(
            z.object({
              name: z.string(),
              email: z.string().email(),
            }),
          ),
        }),
      },
    },
    async (request) => {
      const {
        destination,
        starts_at,
        ends_at,
        owner_name,
        owner_email,
        participants,
      } = request.body;

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

      const trip = await prisma.trip.create({
        data: {
          destination,
          starts_at,
          ends_at,
          participant: {
            createMany: {
              data: [
                {
                  name: owner_name,
                  email: owner_email,
                  is_confirmed: true,
                  is_owner: true,
                },
                ...participants.map(({ name, email }) => {
                  return { name: name, email: email };
                }),
              ],
            },
          },
        },
      });

      return { tripId: trip.id };
    },
  );
}
