import { z } from "zod";

const userSchema = z.object({
  step: z.literal(1),
  email: z
    .string()
    .email({ message: "Please provide a valid email" })
    .min(1, { message: "Please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  givenName: z.string(),
  surname: z.string(),
  city: z.string(),
  phoneNumber: z.string().min(1, { message: "Please enter a phone number" }),
  profileDescription: z.string(),
});

const caregiverSchema = z.object({
  step: z.literal(2),
  photo: z.string(),
  gender: z.string(),
  caregivingType: z.string(),
  hourlyRate: z.number(),
});

const memberSchema = z.object({
  step: z.literal(2),
  houseRules: z.string(),
});

const addressSchema = z.object({
  step: z.literal(3),
  houseNumber: z.string(),
  street: z.string(),
  town: z.string(),
});

export const caregiverRegistrationSchema = z.discriminatedUnion("step", [
  userSchema,
  caregiverSchema,
]);

export const memberRegistrationSchema = z.discriminatedUnion("step", [
  userSchema,
  memberSchema,
  addressSchema,
]);
