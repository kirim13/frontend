import { z } from "zod";

export type activeNotifType = {
  type: string;
  checked: boolean;
};

export type FoodData = {
  name: string;
  quantity: number;
  units: string;
};

const ModalNotificationSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  type: z.string(),
  quantity: z.number().nonnegative(),
  unit: z.string(),
  dosageQuantity: z.number().nonnegative(),
  dosageUnit: z.string(),
  frequencyQuantity: z.number().nonnegative(),
  frequencyUnit: z.string(),
  dayOfTheWeek: z.string().optional(),
  time: z.string(),
  end_date: z.string().optional(),
  isRepeating: z.string().optional(),
  notes: z.string().optional(),
  files: z.string().optional(),
  imageSrc: z.string(),
  userId: z.string().optional(),
  petId: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
});

export type NotificationModalData = z.infer<typeof ModalNotificationSchema>;

export type NotificationModalProps = {
  isOpen: boolean;
  onSubmit: (data: NotificationModalData) => void;
  onClose: () => void;
};

export type AlertNotificationProps = {
  currentDaySelected: Date;
};
