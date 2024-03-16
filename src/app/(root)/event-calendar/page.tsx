"use client";

import AddFriend from "@/components/notifications/AddFriend";
import AddNotification from "@/components/notifications/AddNotification";
import Calendar from "@/components/notifications/Calendar";
import Button from "@/components/shared/Button";
import { NotificationModalData } from "@/types/notifications";
import { User } from "@/types/relationships";
import { MouseEvent, useState } from "react";

export default function EventCalendar() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isNotificationModalOpen, setNotificationModalOpen] =
    useState<boolean>(false);

  const handleNotificationModalOpen = () => {
    setNotificationModalOpen(true);
  };
  const handleCloseNotificationModal = () => {
    setNotificationModalOpen(false);
  };
  const handleFormSubmit = (data: NotificationModalData[]): void => {
    handleCloseNotificationModal();
  };

  const changeUser = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    fetch(`http://localhost:3001/users/username/${target.id}`, {
      method: "GET",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const userData = await res.json();
        setCurrentUser(userData);
        console.log(`Currently logged in: ${userData.username}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="h-full border">
      <div className="flex flex-col gap-4 border p-3">
        <div className="flex flex-col p-4 gap-4 border ">
          <div className="flex flex-row gap-4">
            <div>Current User:</div>
            <div>{currentUser ? currentUser.username : "No Current User"}</div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="flex gap-4">
              <button
                id="johnsmith1"
                className="border p-1"
                onClick={(e) => changeUser(e)}
              >
                Set To johnsmith1
              </button>
              <button
                id="marysmith1"
                className="border p-1"
                onClick={(e) => changeUser(e)}
              >
                Set To marysmith1
              </button>
            </div>
            <AddFriend />
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full justify-between px-2">
        <h2 className="heading2 w-1/2">EVENT CALENDAR</h2>
        <div className="flex px-2 justify-end">
          <Button>
            <button
              onClick={handleNotificationModalOpen}
              className="border p-2"
            >
              Add Notification
            </button>
            <AddNotification
              isOpen={isNotificationModalOpen}
              onClose={handleCloseNotificationModal}
              onSubmit={handleFormSubmit}
              activeUser={currentUser}
            />
          </Button>
        </div>
      </div>
      <Calendar user={currentUser} />
    </div>
  );
}
