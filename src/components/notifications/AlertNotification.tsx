import { useEffect, useState } from "react";
import { NotificationModalData } from "./AddNotification";

function AlertNotification() {
  const [notification, setNotification] = useState<NotificationModalData>();

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
        console.log(data[1]);
        setNotification(data[1]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // empty array means the effect will run once

  const handleCheckbox = () => {
    if (notification) {
      let checkbox = document.getElementById(`${notification.id} checkbox`);
      if (checkbox.checked) {
        notification.completed = true;
      } else {
        notification.completed = false;
      }
      console.log(notification.completed);
    }
  };

  return (
    <div>
      {notification && notification.completed === false && (
        <fieldset className="notification-fieldset">
          <legend className="notification-legend">{notification.type}</legend>
          <div className="flex flex-row items-center">
            <div className="notification-label">
              <p>{notification.name}</p>
              <p>{`${notification.quantity} ${notification.unit}`}</p>
            </div>
            <div className="w-1/2 flex justify-end px-4">
              <input
                type="checkbox"
                id={`${notification.id} checkbox`}
                onClick={handleCheckbox}
              />
            </div>
          </div>
          <div className="notification-time">
            <p>{`${notification.frequency_quantity} ${notification.frequency_unit}`}</p>
            <p>{`${notification.dosage_quantity} ${notification.dosage_unit}`}</p>
            <p>{notification.time}</p>
          </div>
        </fieldset>
      )}
    </div>
  );
}

export default AlertNotification;
