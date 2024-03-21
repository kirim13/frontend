import { z } from "zod";

const ModalPetSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string(),
  type: z.string(),
  breed: z.string(),
  birthday: z.string(),
  gotchaDate: z.string().optional(),
  primaryOwnerId: z.string(),
});

export type PetModalData = z.infer<typeof ModalPetSchema>;

export type AddPetProps = {
  userId: string;
};
