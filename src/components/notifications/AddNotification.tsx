"use client";

import {
  daysOfTheWeek,
  notificationType,
  FrequencyUnit,
  RepeatingType,
} from "@/constants";
import Image from "next/image";
import { MouseEvent, useEffect, useState, useId } from "react";
import { z } from "zod";
import Modal from "../shared/modal";
import Button from "../shared/Button";

const ModalNotificationSchema = z.object({
  name: z.string(),
  type: z.string(),
  quantity: z.number().nonnegative(),
  unit: z.string(),
  dosage_quantity: z.number().nonnegative(),
  dosage_unit: z.string(),
  frequency_quantity: z.number().nonnegative(),
  frequency_unit: z.string(),
  dayOfTheWeek: z.string().optional(),
  time: z.string(),
  end_date: z.string().optional(),
  isRepeating: z.string().optional(),
  notes: z.string().optional(),
  files: z.string().optional(),
  imageSrc: z.string(),
});

export type NotificationModalData = z.infer<typeof ModalNotificationSchema>;
type NotificationModalProps = {
  isOpen: boolean;
  onSubmit: (data: NotificationModalData) => void;
  onClose: () => void;
};

const initialNotificationModalData: NotificationModalData = {
  name: "",
  type: "",
  quantity: 0,
  unit: "",
  dosage_quantity: 0,
  dosage_unit: "",
  frequency_quantity: 0,
  frequency_unit: "",
  dayOfTheWeek: "",
  time: "",
  end_date: "",
  isRepeating: "",
  notes: "",
  files: "",
  imageSrc: "",
};

const AddNotification: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [page, setPage] = useState(0);
  const [notification, setNotification] = useState<NotificationModalData>(
    initialNotificationModalData
  );

  const id = useId();

  const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const handlePreviousClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(page - 1);
  };

  const handleFileChange = (e: any) => {
    const reader = new FileReader();
    const selectedFile = e.target.files[0];

    sessionStorage.setItem(
      "files",
      JSON.stringify({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
      })
    );
    setNotification({ ...notification, files: selectedFile });

    if (selectedFile) {
      reader.onload = (FRevent) => {
        if (FRevent.target) {
          const imgElement = document.getElementById(
            "files"
          ) as HTMLImageElement;
          if (imgElement) {
            imgElement.src = FRevent.target.result as string;
            setNotification({
              ...notification,
              imageSrc: imgElement.src,
            });
          }
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  async function sendData() {
    const notificationData = JSON.stringify(notification);
    try {
      const response = await fetch("http://localhost:3001/notifications", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: notificationData,
      });
      console.log(await response.json());
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmitClick = (e: any) => {
    e.preventDefault();
    sessionStorage.setItem(
      "notes",
      (document.getElementById("notes") as HTMLInputElement).value
    );
    sessionStorage.setItem(
      "files",
      (document.getElementById("files") as HTMLInputElement).value
    );
    sendData();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        id="form-notification"
        className="flex flex-col gap-4 py-2"
        onSubmit={handleSubmitClick}
      >
        {page === 0 && (
          <section className="section">
            <h2 className="heading2">Notification</h2>
            <div className="flex flex-col">
              <label htmlFor="notification_name">Name:</label>
              <input
                type="text"
                id="notification_name"
                name="notification_name"
                className="border"
                value={notification.name}
                onChange={(e) =>
                  setNotification({ ...notification, name: e.target.value })
                }
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="notification_type">Type:</label>
              <select
                id="notification_type"
                className="border"
                defaultValue={notification.type}
                onChange={(e) =>
                  setNotification({
                    ...notification,
                    type: e.target.value,
                  })
                }
              >
                {notificationType.map((type, index) => (
                  <option key={index}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="notification_quantity">Quantity:</label>
                <input
                  type="number"
                  id="notification_quantity"
                  name="notification_quantity"
                  className="border"
                  defaultValue={notification.quantity}
                  min={0}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      quantity: Number(e.target.value),
                    })
                  }
                ></input>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="notification_unit">Unit:</label>
                <input
                  type="text"
                  id="notification_unit"
                  name="notification_unit"
                  className="border"
                  defaultValue={notification.unit}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      unit: e.target.value,
                    })
                  }
                ></input>
              </div>
            </div>
            <Button>
              <p className="w-full py-2"></p>
              <button
                type="button"
                onClick={handleNextClick}
                className="w-full py-2 border"
              >
                Next
              </button>
            </Button>
          </section>
        )}

        {page === 1 && (
          <section className="section">
            <h2 className="heading2">Notification Details</h2>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="dosage_quantity">Dosage Quantity:</label>
                <input
                  type="number"
                  id="dosage_quantity"
                  name="dosage_quantity"
                  className="border"
                  min={0}
                  defaultValue={notification.dosage_quantity}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      dosage_quantity: Number(e.target.value),
                    })
                  }
                ></input>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="dosage_unit">Dosage Unit:</label>
                <input
                  type="text"
                  id="dosage_unit"
                  name="dosage_unit"
                  className="border"
                  defaultValue={notification.dosage_unit}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      dosage_unit: e.target.value,
                    })
                  }
                ></input>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="frequency_quantity">Frequency Quantity:</label>
                <input
                  type="number"
                  id="frequency_quantity"
                  name="frequency_quantity"
                  className="border"
                  min={0}
                  defaultValue={notification.frequency_quantity}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      frequency_quantity: Number(e.target.value),
                    })
                  }
                ></input>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="frequency_unit">Frequency Unit:</label>
                <select
                  id="frequency_unit"
                  className="border"
                  defaultValue={notification.frequency_unit}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      frequency_unit: e.target.value,
                    })
                  }
                >
                  {FrequencyUnit.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button>
              <button
                type="button"
                onClick={handlePreviousClick}
                className="w-full py-2 border"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextClick}
                className="w-full py-2 border"
              >
                Next
              </button>
            </Button>
          </section>
        )}

        {page === 2 && (
          <section className="section">
            <h2 className="heading2">Notification Schedule</h2>
            <div className="flex flex-col">
              <label htmlFor="day">Day:</label>
              <select
                name="day"
                id="day"
                className="border"
                defaultValue={notification.dayOfTheWeek}
                onChange={(e) =>
                  setNotification({
                    ...notification,
                    dayOfTheWeek: e.target.value,
                  })
                }
              >
                {daysOfTheWeek.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="time">Time:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="border"
                  defaultValue={notification.time}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      time: e.target.value,
                    })
                  }
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="end_date">End Date:</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className="border"
                placeholder="MM/DD/YY"
                pattern="^(0[1-9]|1[0-2])\/0[1-3]|1[0-9])\/([0-9]{2})$"
                defaultValue={notification.end_date}
                onChange={(e) =>
                  setNotification({
                    ...notification,
                    end_date: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="isRepeating">Repeating?</label>
              <select
                name="isRepeating"
                id="isRepeating"
                className="border"
                defaultValue={notification.isRepeating}
                onChange={(e) =>
                  setNotification({
                    ...notification,
                    isRepeating: e.target.value,
                  })
                }
              >
                {RepeatingType.map((repeating, index) => (
                  <option key={index} value={repeating}>
                    {repeating}
                  </option>
                ))}
              </select>
            </div>
            <Button>
              <button
                type="button"
                onClick={handlePreviousClick}
                className="w-full py-2 border"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextClick}
                className=" w-full py-2 border"
              >
                Next
              </button>
            </Button>
          </section>
        )}

        {page === 3 && (
          <section className="section">
            <h2 className="heading2">Notification Last Notes</h2>
            <div className="flex flex-col">
              <label htmlFor="notes">Additional Notes:</label>
              <textarea
                id="notes"
                name="notes"
                className="border"
                value={notification.notes}
                onChange={(e) =>
                  setNotification({ ...notification, notes: e.target.value })
                }
              ></textarea>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="files">Additional Files:</label>
              <input
                type="file"
                id="files"
                name="files"
                className="border"
                onChange={handleFileChange}
                accept="image/*"
              ></input>
              <label htmlFor="files_active">Selected File:</label>
              {notification.imageSrc !== "" && (
                <Image
                  src={notification.imageSrc}
                  id="files_active"
                  width={100}
                  height={100}
                  alt="selected file"
                />
              )}
            </div>
            <Button>
              <button
                type="button"
                onClick={handlePreviousClick}
                className="w-full py-2 border"
              >
                Previous
              </button>
              <button type="submit" className="w-full py-2 border">
                Submit
              </button>
            </Button>
          </section>
        )}
      </form>
    </Modal>
  );
};

export default AddNotification;
