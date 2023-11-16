import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  seats: Joi.number().min(1).max(30),
  year: Joi.number()
    .min(1889)
    .max(new Date().getFullYear() + 1),
  miles: Joi.number().required().min(0),
  price: Joi.number().required().min(0),
  image: Joi.string().required(),
  features: Joi.array().items(Joi.string().required()).required(),
  description: Joi.string().required(),
  city: Joi.string().required(),
  listerId: Joi.string().required(),
  name: Joi.string().required(),
});
//   seats       Int

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const prisma = new PrismaClient();

  const { error, value } = schema.validate(body);

  const {
    make,
    model,
    seats,
    miles,
    price,
    image,
    features,
    description,
    city,
    listerId,
    name,
  } = body;

  const car = await prisma.car.create({
    data: {
      make,
      model,
      seats,
      miles,
      price,
      image,
      features,
      description,
      city,
      listerId,
      name,
    },
  });

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }
  return car;
});
