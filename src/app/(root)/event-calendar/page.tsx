"use client";

import { useEffect, useState } from "react";
import Button from "@/components/shared/Button";
import AddNotification, {
  NotificationModalData,
} from "@/components/notifications/AddNotification";
import AlertNotification from "@/components/notifications/AlertNotification";

export default function EventCalendar() {
  return (
    <div>
      <div className="flex flex-row justify-between border px-2">
        <h2 className="heading2">EVENT CALENDAR</h2>
      </div>
      <AlertNotification />
    </div>
  );
}
