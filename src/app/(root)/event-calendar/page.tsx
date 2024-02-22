"use client";

import { useEffect, useState } from "react";
import Button from "@/components/shared/Button";
import AddNotification, {
  NotificationModalData,
} from "@/components/notifications/AddNotification";
import AlertNotification from "@/components/notifications/AlertNotification";

export default function EventCalendar() {
  const [isNotificationModalOpen, setNotificationModalOpen] =
    useState<boolean>(false);
  const [notificationData, setNotificationData] =
    useState<NotificationModalData | null>(null);

  const handleNotificationModalOpen = () => {
    setNotificationModalOpen(true);
  };
  const handleCloseNotificationModal = () => {
    setNotificationModalOpen(false);
  };
  const handleFormSubmit = (data: NotificationModalData): void => {
    setNotificationData(data);
    handleCloseNotificationModal();
  };

  return (
    <div>
      <div className="flex flex-row justify-between border px-2">
        <h2 className="heading2">EVENT CALENDAR</h2>
        <Button>
          <button onClick={handleNotificationModalOpen} className="border p-2">
            Add Notification
          </button>
          <AddNotification
            isOpen={isNotificationModalOpen}
            onClose={handleCloseNotificationModal}
            onSubmit={handleFormSubmit}
          />
        </Button>
      </div>
      <AlertNotification />
    </div>
  );
}
