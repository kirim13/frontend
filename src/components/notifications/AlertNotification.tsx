import { useEffect, useState } from "react";
import { NotificationModalData } from "./AddNotification";
import Button from "@/components/shared/Button";
import AddNotification from "@/components/notifications/AddNotification";
import Calendar from "@/components/notifications/Calendar";

function AlertNotification() {
  const [notification, setNotification] = useState<NotificationModalData[]>([]);
  const [date, setDate] = useState(new Date());
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

  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    fetch(
      "http://localhost:3001/notifications/user/clspfh9em00004ju0nwklyklg",
      {
        method: "GET",
      }
    )
      .then(async (res) => {
        const data: NotificationModalData[] = await res.json();

        if (!res.ok) {
          const error = res.statusText;
          return Promise.reject(error);
        }
        setNotification(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // empty array means the effect will run once

  const handleCheckbox = (i: number) => {
    if (notification[i]) {
      let checkbox = document.getElementById(
        `${notification[i].id} checkbox`
      ) as HTMLInputElement;
      if (checkbox.checked) {
        notification[i].completed = true;
      } else {
        notification[i].completed = false;
      }
    }
    setNotification([...notification]);
  };

  return (
    <div className="flex flex-row border">
      <div className="w-full">
        <Calendar />
      </div>

      <div className="w-full">
        <div className="flex flex-row border items-center">
          <div className="title">Notifications</div>
          <p>{date.toLocaleDateString()}</p>
          <div className="flex w-full px-2 justify-end">
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
              />
            </Button>
          </div>
        </div>

        {notification.map((notif: NotificationModalData, i: number) => (
          <div key={`${i} ${notif.id}`} className="px-2 border">
            {notif && notif.completed === false && (
              <fieldset className="notification-fieldset w-1/2">
                <legend className={`notification-legend-${notif.type}`}>
                  {notif.type}
                </legend>

                <div className="flex flex-row border">
                  <div className={`notification-label-${notif.type}`}></div>
                  <div className="flex flex-col border w-5/6">
                    <div className="notification-label">
                      {`${notif.quantity} ${notif.unit} of ${notif.dosageQuantity} ${notif.dosageUnit} ${notif.name}`}
                    </div>
                    <div className="notification-time">{notif.time}</div>
                  </div>
                  <div className="flex items-center w-1/6 justify-center">
                    <label htmlFor={`${notif.id} checkbox`}>
                      <input
                        type="checkbox"
                        id={`${notif.id} checkbox`}
                        name={`${notif.id} checkbox`}
                        onClick={() => handleCheckbox(i)}
                        defaultChecked={notif.completed}
                      />
                    </label>
                  </div>
                </div>
              </fieldset>
            )}
          </div>
        ))}

        <div className="flex flex-row border items-center">
          <div className="title">Completed Notifications</div>
        </div>
        {notification.map((notif: NotificationModalData, i: number) => (
          <div key={`${i} ${notif.id}`}>
            {notif && notif.completed === true && (
              <fieldset className="notification-fieldset w-1/2">
                <legend className={`notification-legend-${notif.type}`}>
                  {notif.type}
                </legend>

                <div className="flex flex-row border">
                  <div className="border px-2 bg-blue-100"></div>
                  <div className="flex flex-col border w-5/6">
                    <div className="notification-label">
                      {`${notif.quantity} ${notif.unit} of ${notif.dosageQuantity} ${notif.dosageUnit} ${notif.name}`}
                    </div>
                    <div className="notification-time">{notif.time}</div>
                  </div>
                  <div className="flex items-center w-1/6 justify-center">
                    <label
                      htmlFor={`${notif.id} checkbox`}
                      className="flex justify-end border"
                    >
                      <input
                        type="checkbox"
                        id={`${notif.id} checkbox`}
                        name={`${notif.id} checkbox`}
                        onClick={() => handleCheckbox(i)}
                        defaultChecked={notification[i].completed}
                      />
                    </label>
                  </div>
                </div>
              </fieldset>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertNotification;
