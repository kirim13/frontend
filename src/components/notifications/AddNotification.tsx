"use client";

import { daysOfTheWeek, notificationType, FrequencyUnit } from "@/constants";
import { MouseEvent, useEffect, useState } from "react";

function AddNotification() {
  const [page, setPage] = useState(0);
  const [notification, setNotification] = useState({
    name: sessionStorage.getItem("notification_name") || undefined,
    type: sessionStorage.getItem("notification_type") || undefined,
    quantity: sessionStorage.getItem("notification_quantity") || undefined,
    unit: sessionStorage.getItem("notification_unit") || undefined,
    dosage_quantity: sessionStorage.getItem("dosage_quantity") || undefined,
    dosage_unit: sessionStorage.getItem("dosage_unit") || undefined,
    frequency_quantity:
      sessionStorage.getItem("frequency_quantity") || undefined,
    frequency_unit: sessionStorage.getItem("frequency_unit") || undefined,
  });

  const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    switch (page) {
      case 0:
        sessionStorage.setItem(
          "notification_name",
          (document.getElementById("notification_name") as HTMLInputElement)
            ?.value
        );
        sessionStorage.setItem(
          "notification_type",
          (document.getElementById("notification_type") as HTMLSelectElement)
            .value
        );
        sessionStorage.setItem(
          "notification_quantity",
          (
            document.getElementById(
              "notification_quantity"
            ) as HTMLSelectElement
          ).value
        );
        sessionStorage.setItem(
          "notification_unit",
          (document.getElementById("notification_unit") as HTMLInputElement)
            .value
        );
        break;
      case 1:
        sessionStorage.setItem(
          "dosage_quantity",
          (document.getElementById("dosage_quantity") as HTMLInputElement)
            ?.value
        );
        sessionStorage.setItem(
          "dosage_unit",
          (document.getElementById("dosage_unit") as HTMLSelectElement).value
        );
        sessionStorage.setItem(
          "frequency_quantity",
          (document.getElementById("frequency_quantity") as HTMLSelectElement)
            .value
        );
        sessionStorage.setItem(
          "frequency_unit",
          (document.getElementById("frequency_unit") as HTMLSelectElement).value
        );
        break;
    }

    setPage(page + 1);
  };

  const handlePreviousClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(page - 1);
  };

  return (
    <div>
      <form
        action="/notification"
        method="post"
        className="flex flex-col gap-4 py-2"
      >
        {page === 0 && (
          <section className="section">
            <h2 className="heading2">Notification</h2>
            <div className="flex flex-col">
              <label htmlFor="notification_name">Name</label>
              <input
                type="text"
                id="notification_name"
                name="notification_name"
                className="border"
                onChange={(e) =>
                  setNotification({ ...notification, name: e.target.value })
                }
                defaultValue={notification.name}
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="notification_type">Type</label>
              <select
                id="notification_type"
                className="border"
                onChange={(e) =>
                  setNotification({ ...notification, type: e.target.value })
                }
                defaultValue={notification.type}
              >
                {notificationType.map((type, index) => (
                  <option key={index}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="notification_quantity">Quantity</label>
                <input
                  type="number"
                  id="notification_quantity"
                  name="notification_quantity"
                  className="border"
                  defaultValue={notification.quantity}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      quantity: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="notification_unit">Unit</label>
                <input
                  type="text"
                  id="notification_unit"
                  name="notification_unit"
                  className="border"
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      unit: e.target.value,
                    })
                  }
                  defaultValue={notification.unit}
                ></input>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <button
                type="button"
                onClick={handleNextClick}
                className="w-full mt-4 py-2 border"
              >
                Next
              </button>
            </div>
          </section>
        )}

        {page === 1 && (
          <section className="section">
            <h2 className="heading2">Notification Details</h2>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="dosage_quantity">Dosage Quantity</label>
                <input
                  type="number"
                  id="dosage_quantity"
                  name="dosage_quantity"
                  className="border"
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      dosage_quantity: e.target.value,
                    })
                  }
                  defaultValue={notification.dosage_quantity}
                ></input>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="dosage_unit">Dosage Unit</label>
                <input
                  type="text"
                  id="dosage_unit"
                  name="dosage_unit"
                  className="border"
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      dosage_unit: e.target.value,
                    })
                  }
                  defaultValue={notification.dosage_unit}
                ></input>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="frequency_quantity">Frequency Quantity</label>
                <input
                  type="number"
                  id="frequency_quantity"
                  name="frequency_quantity"
                  className="border"
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      frequency_quantity: e.target.value,
                    })
                  }
                  defaultValue={notification.frequency_quantity}
                ></input>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="frequency_unit">Frequency Unit</label>
                <select
                  id="frequency_unit"
                  className="border"
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      frequency_unit: e.target.value,
                    })
                  }
                  defaultValue={notification.frequency_unit}
                >
                  {FrequencyUnit.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <button
                type="button"
                onClick={handlePreviousClick}
                className="w-full mt-4 py-2 border"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextClick}
                className="w-full mt-4 py-2 border"
              >
                Next
              </button>
            </div>
          </section>
        )}

        {page === 2 && (
          <section className="section">
            <h2 className="heading2">Notification Schedule</h2>
            <div className="flex flex-col">
              <label htmlFor="day">Day</label>
              <select name="day" id="day" className="border">
                {daysOfTheWeek.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="border"
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className="border"
                placeholder="MM/DD/YY"
                pattern="^(0[1-9]|1[0-2])\/0[1-3]|1[0-9])\/([0-9]{2})$"
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="isRepeating">Repeating?</label>
              <input
                type="text"
                id="isRepeating"
                name="isRepeating"
                className="border"
              ></input>
            </div>
            <input type="hidden" id="timestamp" name="createdAt" value="" />
            <div className="flex flex-row gap-4">
              <button
                type="button"
                onClick={handlePreviousClick}
                className="w-full mt-4 py-2 border"
              >
                Previous
              </button>
              <button type="submit" className=" w-full mt-4 py-2 border">
                Submit
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
}

export default AddNotification;
