import { useEffect, useState } from "react";
import {
  AlertNotificationProps,
  NotificationModalData,
} from "@/types/notifications";
import { updateNotificationCompleted } from "@/api/notifications";
import NotificationModal from "./NotificationModal";

const AlertNotification: React.FC<AlertNotificationProps> = (props) => {
  const [notifications, setNotifications] = useState<NotificationModalData[]>(
    []
  );
  const [isNotificationModalOpen, setNotificationModalOpen] =
    useState<boolean>(false);

  const handleNotificationModalOpen = () => {
    setNotificationModalOpen(true);
  };
  const handleNotificationModalClose = () => {
    setNotificationModalOpen(false);
  };

  useEffect(() => {
    setNotifications(props.notifications);
  }, [props.notifications]);

  const handleCheckbox = async (index: number) => {
    const updatedNotifications = [...notifications];
    const notification = updatedNotifications[index];

    if (notification) {
      notification.completed = !notification.completed;
      setNotifications(updatedNotifications);

      try {
        await updateNotificationCompleted(notification.id, {
          ...notification,
          completed: notification.completed,
        });
        console.log(
          `${props.activeUser?.username} ${
            notification.completed ? "checked" : "unchecked"
          } ${notification.name}`
        );
      } catch (err: any) {
        console.log(
          `Error updating notification completed with ID ${notification.id} on the server. Error: ${err.message}`
        );
      }
    }
  };

  return (
    <div className="w-full h-full border">
      <div className="flex flex-col">
        <div className="flex border flex-row items-center">
          <div className="title">Notifications</div>
          <p>{props.currentDaySelected.toLocaleDateString()}</p>
        </div>

        {notifications.map((notif: NotificationModalData, i: number) => {
          const shouldRender =
            notif &&
            notif.date.toString().slice(0, 10) ===
              props.currentDaySelected.toISOString().slice(0, 10) &&
            notif.completed === false &&
            props.activeTypes[notif.type] &&
            props.activeNames[notif.petId] &&
            props.activeTypes[notif.type].checked &&
            props.activeNames[notif.petId].checked;

          return shouldRender ? (
            <div key={`${i} ${notif.id}`} className="px-2 h-full">
              <fieldset className="notification-fieldset w-1/2 flex flex-col">
                <div className="flex flex-row justify-between items-center">
                  <legend className={`notification-legend-${notif.type}`}>
                    {notif.type}
                  </legend>
                  <button onClick={handleNotificationModalOpen}>Edit</button>
                  <NotificationModal
                    isOpen={isNotificationModalOpen}
                    onClose={handleNotificationModalClose}
                    notificationProp={notif}
                  />
                </div>

                <div className="flex flex-row border w-full">
                  <div className={`notification-label-${notif.type}`}></div>
                  <div className="px-4 flex-row gap-4 w-5/6">
                    {`${
                      notif.type === "Medicine"
                        ? `${notif.quantity} ${notif.unit} of ${notif.dosageQuantity} ${notif.dosageUnit} ${notif.name}`
                        : `${notif.quantity} ${notif.unit} of ${notif.name}`
                    }
                      `}
                    <div className="flex flex-row gap-4">
                      {notif.time.map((ti, i) => (
                        <div key={`${i} ${ti}`}>
                          <div>{ti}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center w-1/6 justify-center border">
                    <label htmlFor={`${notif.id} checkbox`}>
                      <input
                        type="checkbox"
                        id={`${notif.id} checkbox`}
                        name={`${notif.id} checkbox`}
                        onChange={() => handleCheckbox(i)}
                        defaultChecked={notif.completed}
                      />
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          ) : null;
        })}

        <div className="flex flex-row border items-center h-full">
          <div className="title">Completed Notifications</div>
        </div>
        {notifications.map((notif: NotificationModalData, i: number) => {
          let shouldRenderCompleted =
            notif &&
            notif.completed === true &&
            notif.date.toString().slice(0, 10) ===
              props.currentDaySelected.toISOString().slice(0, 10) &&
            props.activeTypes[notif.type] &&
            props.activeNames[notif.petId] &&
            props.activeTypes[notif.type].checked &&
            props.activeNames[notif.petId].checked;

          return shouldRenderCompleted ? (
            <div key={`${i} ${notif.id}`}>
              <fieldset className="notification-fieldset w-1/2">
                <legend className={`notification-legend-${notif.type}`}>
                  {notif.type}
                </legend>

                <div className="flex flex-row border w-full">
                  <div className={`notification-label-${notif.type}`}></div>
                  <div className="px-4 flex-row gap-4 w-5/6">
                    {`${
                      notif.type === "Medicine"
                        ? `${notif.quantity} ${notif.unit} of ${notif.dosageQuantity} ${notif.dosageUnit} ${notif.name}`
                        : `${notif.quantity} ${notif.unit} of ${notif.name}`
                    }`}
                    <div className="flex flex-row gap-4">
                      {notif.time.map((ti, i) => (
                        <div key={`${i} ${ti}`}>
                          <div>{ti}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-1/6 flex items-center justify-center border">
                    <label
                      htmlFor={`${notif.id} checkbox`}
                      className="flex justify-end border"
                    >
                      <input
                        type="checkbox"
                        id={`${notif.id} checkbox`}
                        name={`${notif.id} checkbox`}
                        onChange={() => handleCheckbox(i)}
                        defaultChecked={notifications[i].completed}
                      />
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default AlertNotification;
