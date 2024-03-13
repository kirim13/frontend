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
  dosageQuantity: z.number().nonnegative().optional(),
  dosageUnit: z.string().optional(),
  frequencyQuantity: z.number().nonnegative().optional(),
  frequencyUnit: z.string().optional(),
  day: z.array(z.string().optional()),
  time: z.array(z.string()),
  endDate: z.array(z.string().optional()),
  repeating: z.array(z.string().optional()),
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
  onSubmit: (data: NotificationModalData[]) => void;
  onClose: () => void;
};

export type AlertNotificationProps = {
  currentDaySelected: Date;
  notifications: NotificationModalData[];
  activeTypes: ActiveTypes;
  activeNames: ActiveNames;
};

export type UserPets = {
  [category: string]: {
    [petName: string]: {
      notifications: {
        [notificationType: string]: string[];
      };
    };
  };
};

export type ActiveNames = {
  [id: string]: { name: string; checked: boolean };
};

export type ActiveTypes = {
  [type: string]: { checked: boolean };
};
