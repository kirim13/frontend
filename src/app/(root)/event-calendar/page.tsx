"use client";

import Calendar from "@/components/notifications/Calendar";

export default function EventCalendar() {
  return (
    <div className="h-full border">
      <div className="flex flex-row justify-between px-2">
        <h2 className="heading2">EVENT CALENDAR</h2>
      </div>
      <Calendar />
    </div>
  );
}
