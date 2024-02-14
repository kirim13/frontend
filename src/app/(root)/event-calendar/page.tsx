"use client";

import { useState } from "react";
import Button from "@/components/shared/Button";
import AddNotification, {
  NotificationModalData,
} from "@/components/notifications/AddNotification";

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
      <div className="flex justify-between">
        <h2 className="heading2">EVENT CALENDAR</h2>
        <Button>
          <button onClick={handleNotificationModalOpen} className="border p-2">
            Add Notification
          </button>
        </Button>
        <AddNotification
          isOpen={isNotificationModalOpen}
          onClose={handleCloseNotificationModal}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
