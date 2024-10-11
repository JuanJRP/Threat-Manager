import { Role } from "@prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres",
  }),
  first_name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  last_name: z
    .string()
    .min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
  email: z.string().email({ message: "El email debe ser válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  role: z.array(z.enum([Role.ADMIN, Role.USER])).optional(),
  refresh_token: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const registerUserSchema = createUserSchema.omit({
  role: true,
  refresh_token: true,
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = registerUserSchema
  .omit({ first_name: true, last_name: true })
  .extend({
    email: z.string().email({ message: "El email debe ser válido" }).optional(),
  });

export type LoginUserInput = z.infer<typeof loginUserSchema>;
