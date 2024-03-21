import { NotificationModalData } from "@/types/notifications";
import { PetModalData } from "@/types/pets";

export const sidebarLinks = [
  {
    imgURL: "/assets/home-plaza.png",
    route: "/",
    label: "Home Plaza",
  },
  {
    imgURL: "/assets/my-dailies.png",
    route: "/my-dailies",
    label: "Dailies",
  },
  {
    imgURL: "/assets/family-overview.png",
    route: "/family-overview",
    label: "Family Overview",
  },
  {
    imgURL: "/assets/pet-records.png",
    route: "/pet-records",
    label: "Pet Records",
  },
  {
    imgURL: "/assets/photo-album.png",
    route: "/photo-album",
    label: "Photo Album",
  },
  {
    imgURL: "/assets/event-calendar.png",
    route: "/event-calendar",
    label: "Event Calendar",
  },
  {
    imgURL: "/assets/vievista-logo.png",
    route: "/my-social-homepage",
    label: "Social Page",
  },
];

export const socialtopbarLinks = [
  {
    route: "/my-social-feed",
    label: "Social Feed",
  },
  {
    route: "/global-feed",
    label: "Global Feed",
  },
  {
    route: "/ask-the-community",
    label: "Ask the Community",
  },
];

export const daysOfTheWeek = [
  "",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const notificationType = ["", "Medicine", "Food", "Water"] as const;

export const FrequencyUnit = [
  "",
  "Daily",
  "Days",
  "Weekly",
  "Biweekly",
  "Weeks",
  "Monthly",
  "Bimonthly",
  "Months",
  "Quarterly",
] as const;

export const RepeatingType = [
  "",
  "Daily",
  "Weekly",
  "Biweekly",
  "Monthly",
  "Quarterly",
] as const;

/* CALENDAR */
export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const weekDaysAbbr = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat",
];

export const initialNotificationModalData: NotificationModalData = {
  name: "",
  type: "",
  quantity: 0,
  unit: "",
  dosageQuantity: 0,
  frequencyQuantity: 0,
  date: "",
  day: [],
  time: [],
  endDate: "",
  repeating: [],
  notes: "",
  files: "",
  imageSrc: "",
  userId: "",
  petId: "clttnp58f0001693x54lumj70",
};

export const initialPetModalData: PetModalData = {
  firstName: "",
  lastName: "",
  type: "",
  breed: "",
  birthday: "",
  gotchaDate: "",
};
