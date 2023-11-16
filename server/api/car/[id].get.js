import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const car = await prisma.car.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: `Cant find car with ${id}`,
    });
  }

  return car;
});
