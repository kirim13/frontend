import { useEffect, useState } from "react";
import {
  AlertNotificationProps,
  NotificationModalData,
} from "@/types/notifications";

const AlertNotification: React.FC<AlertNotificationProps> = (props) => {
  const [notification, setNotification] = useState<NotificationModalData[]>([]);

  useEffect(() => {
    setNotification(props.notifications);
  }, [props.notifications]);

  const handleCheckbox = (i: number) => {
    if (notification[i]) {
      let checkbox = document.getElementById(
        `${notification[i].id} checkbox`
      ) as HTMLInputElement;
      if (checkbox.checked) {
        notification[i].completed = true;
        console.log(
          `${props.activeUser?.username} checked ${notification[i].name}`
        );
      } else {
        notification[i].completed = false;
        console.log(
          `${props.activeUser?.username} unchecked ${notification[i].name}`
        );
      }
    }
    setNotification([...notification]);
    fetch(
      `http://localhost:3001/notifications/completed/${notification[i].id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: notification[i].completed,
        }),
      }
    )
      .then(async (res) => {
        if (res.ok) {
          console.log(await res.json());
        } else throw new Error("Failed to update notification");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full border">
      <div className="flex flex-col">
        <div className="flex border flex-row items-center">
          <div className="title">Notifications</div>
          <p>{props.currentDaySelected.toLocaleDateString()}</p>
        </div>

        {notification.map((notif: NotificationModalData, i: number) => (
          <div key={`${i} ${notif.id}`} className="px-2 h-full">
            {notif &&
              notif.createdAt?.toString().slice(0, 10) ===
                props.currentDaySelected.toISOString().slice(0, 10) &&
              notif.completed === false &&
              props.activeTypes[notif.type] &&
              props.activeNames[notif.petId] &&
              props.activeTypes[notif.type].checked &&
              props.activeNames[notif.petId].checked && (
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
                      }
                      `}
                      <div className="flex flex-row gap-4">
                        {notif.time.map((ti, i) => (
                          <div key={i}>
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

        <div className="flex flex-row border items-center h-full">
          <div className="title">Completed Notifications</div>
        </div>
        {notification.map((notif: NotificationModalData, i: number) => (
          <div key={`${i} ${notif.id}`}>
            {notif &&
              notif.completed === true &&
              props.activeTypes[notif.type] &&
              props.activeNames[notif.petId] &&
              props.activeTypes[notif.type].checked &&
              props.activeNames[notif.petId].checked &&
              notif.createdAt?.toString().slice(0, 10) ===
                props.currentDaySelected.toISOString().slice(0, 10) && (
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
                          <div key={i}>
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
};

export default AlertNotification;
