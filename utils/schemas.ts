import { z, ZodSchema } from "zod";

// const profileSchema = z
//   .string()
//   .min(2, { message: "Please enter at least 2 characters." });

export const profileSchema = z.object({
  firstName: z.string().min(2, {
    message: "Please enter at least 2 characters for your first name.",
  }),
  lastName: z.string().min(2, {
    message: "Please enter at least 2 characters for your last name.",
  }),
  userName: z.string().min(2, {
    message: "Please enter at least 2 characters for your username.",
  }),
});

export const validateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
