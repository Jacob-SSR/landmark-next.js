import { z, ZodSchema } from "zod";

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

const validateImage = () => {
  const maxFileSize = 1024 * 1024;
  return z.instanceof(File).refine((file) => {
    return file.size <= maxFileSize;
  }, "File size must be less than 1MB");
};

export const imageSchema = z.object({
  image: validateImage(),
});

export const landmarkSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be longer than 2 characters" })
    .max(30, { message: "Name must be less than 30 characters" }),
  category: z.string(),
  description: z
    .string()
    .min(2, { message: "Description must be longer than 2 characters" })
    .max(200, { message: "Description must be less than 200 characters" }),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: "Price must be greater than 0" }),
  province: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

export const validateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
