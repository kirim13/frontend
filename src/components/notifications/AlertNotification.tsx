import { useEffect, useState } from "react";
import { NotificationModalData } from "./AddNotification";

function AlertNotification() {
  const [notification, setNotification] =
    useState<NotificationModalData | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/notifications/clsleqgkj0000j8o19oev9vos", {
      method: "GET",
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          const error = data.message || res.statusText;
          return Promise.reject(error);
        }
        console.log(data);
        setNotification(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // empty array means the effect will run once

  return (
    <div>
      <fieldset className="notification-fieldset">
        <legend className="notification-legend">{notification?.type}</legend>
        <div className="flex flex-row">
          <div className="notification-label">
            <p>{notification?.name}</p>
            <p>{`${notification?.quantity} ${notification?.unit}`}</p>
          </div>
        </div>
        <div className="notification-time">
          <p>{`${notification?.frequency_quantity} ${notification?.frequency_unit}`}</p>
          <p>{`${notification?.dosage_quantity} ${notification?.dosage_unit}`}</p>
          <p>{notification?.time}</p>
        </div>
      </fieldset>
    </div>
  );
}

export default AlertNotification;
