import { useEffect, useState } from "react";
import { NotificationModalData } from "./AddNotification";

function AlertNotification() {
  const [notification, setNotification] = useState<NotificationModalData[]>([]);
  const [date, setDate] = useState(new Date());

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
        const data = await res.json();

        if (!res.ok) {
          const error = data.message || res.statusText;
          return Promise.reject(error);
        }
        for (let i = 0; i < data.length; i++) {
          setNotification((notification) => [...notification, data[i]]);
        }
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
  };

  return (
    <div className="flex flex-row border">
      <div className="title w-full border h-full">Calendar</div>
      <div className="w-full h-1/2">
        <div className="flex flex-row border items-center">
          <div className="title">Notifications</div>
          <p>{date.toLocaleDateString()}</p>
        </div>

        {notification.map((notif: NotificationModalData, i: number) => (
          <div key={i}>
            {notif && notif.completed === false && (
              <fieldset className="notification-fieldset w-1/2">
                <legend className={`notification-legend-${notif.type}`}>
                  {notif.type}
                </legend>

                <div className="flex flex-row border">
                  <div className="flex flex-col border">
                    <div className="notification-label">
                      {`${notif.quantity} ${notif.unit} of ${notif.dosageQuantity} ${notif.dosageUnit} ${notif.name}`}
                    </div>
                    <div className="notification-time">{notif.time}</div>
                  </div>
                  <div className="flex justify-end px-2 items-center">
                    <label htmlFor={`${notif.id} checkbox`}>
                      <input
                        type="checkbox"
                        id={`${notif.id} checkbox`}
                        name={`${notif.id} checkbox`}
                        onClick={() => handleCheckbox(i)}
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
          <div key={i}>
            {notif && notif.completed === true && (
              <fieldset className="notification-fieldset w-1/2">
                <legend className={`notification-legend-${notif.type}`}>
                  {notif.type}
                </legend>

                <div className="flex flex-row border">
                  <div className="flex flex-col border">
                    <div className="notification-label">
                      {`${notif.quantity} ${notif.unit} of ${notif.dosageQuantity} ${notif.dosageUnit} ${notif.name}`}
                    </div>
                    <div className="notification-time">{notif.time}</div>
                  </div>
                  <div className="flex justify-end px-2 items-center">
                    <label htmlFor={`${notif.id} checkbox`}>
                      <input
                        type="checkbox"
                        id={`${notif.id} checkbox`}
                        name={`${notif.id} checkbox`}
                        onClick={() => handleCheckbox(i)}
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
