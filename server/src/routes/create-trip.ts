import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../env";
import { ClientError } from "../errors";
import { dayjs, formattedDate, prisma, sendMail } from "../lib";
import { mailCreateTrip } from "../templates";

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
        throw new ClientError(
          "Invalid trip start date. It cannot be less than today.",
        );
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new ClientError(
          "Invalid trip end date. It cannot be smaller than the initial.",
        );
      }

      const trip = await prisma.trip.create({
        data: {
          destination,
          starts_at,
          ends_at,
          participants: {
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

      await sendMail({
        to: {
          name: owner_name,
          address: owner_email,
        },
        subject: `Confirme sua viagem para ${destination}`,
        html: mailCreateTrip({
          owner_name: owner_name,
          formattedStartDate: formattedDate(starts_at),
          formattedEndDate: formattedDate(ends_at),
          destination: destination,
          confirmationLink: `${env.API_BASE_URL}/trips/${trip.id}/confirm`,
        }),
      });

      return { tripId: trip.id };
    },
  );
}
