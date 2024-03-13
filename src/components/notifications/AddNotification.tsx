"use client";

import { daysOfTheWeek, FrequencyUnit, RepeatingType } from "@/constants";
import Image from "next/image";
import { MouseEvent, useEffect, useState, useId } from "react";
import Modal from "../shared/modal";
import Button from "../shared/Button";
import {
  FoodData,
  NotificationModalData,
  NotificationModalProps,
} from "@/types/notifications";

// Placeholder for current user: clte5s2lp0000st8dcrhqf8jt
export const initialNotificationModalData: NotificationModalData = {
  name: "",
  type: "",
  quantity: 0,
  unit: "",
  dosageQuantity: 0,
  frequencyQuantity: 0,
  day: [],
  time: [],
  endDate: [],
  repeating: [],
  notes: "",
  files: "",
  imageSrc: "",
  userId: "clte5s2lp0000st8dcrhqf8jt",
  petId: "clte5y7f6000113wkfx3ujf4h",
};

const AddNotification: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [page, setPage] = useState(0);
  const [notification, setNotification] = useState<NotificationModalData>(
    initialNotificationModalData
  );
  const [food, setFood] = useState<Map<number, FoodData>>(new Map());

  let numbers: number[] = Array.from(
    { length: notification.frequencyQuantity || 1 },
    (_, index) => index + 1
  );

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
    onClose();
  };

  const typeHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNotification({
      ...notification,
      type: e.currentTarget.value,
    });
  };

  const addFoodHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFood(
      food.set(food.size + 1, {
        name: "",
        quantity: 0,
        units: "",
      })
    );
  };

  const deleteFoodHandler = (e: MouseEvent<HTMLButtonElement>, key: number) => {
    e.preventDefault();
    const updatedFood = new Map(food);
    updatedFood.delete(key);
    setFood(updatedFood);
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
              <label htmlFor="notification_type">Type of Notification:</label>
              <div className="flex flex-row pt-2 justify-around">
                <button
                  value={"Medicine"}
                  onClick={typeHandler}
                  className={`border w-full py-2 ${
                    notification.type === "Medicine" ? "border-red-300" : null
                  }`}
                >
                  Medicine
                </button>
                <button
                  value={"Food"}
                  onClick={typeHandler}
                  className={`border w-full py-2 ${
                    notification.type === "Food" ? "border-red-300" : null
                  }`}
                >
                  Food
                </button>
                <button
                  value={"Water"}
                  onClick={typeHandler}
                  className={`border w-full py-2 ${
                    notification.type === "Water" ? "border-red-300" : null
                  }`}
                >
                  Water
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <label htmlFor="notification_name">{`Name of ${notification.type}`}</label>
                {notification.type === "Food" && (
                  <div>
                    <button onClick={addFoodHandler} className="border px-2">
                      Add Food
                    </button>
                  </div>
                )}
              </div>
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

            <div>
              {notification.type === "Food" &&
                Array.from(food.entries()).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex flex-col">
                      <div className="flex flex-row justify-between">
                        <label htmlFor="notification_name">{`Name of ${notification.type}`}</label>
                        <div>
                          <button
                            onClick={(e) => deleteFoodHandler(e, key)}
                            className="border px-2"
                          >
                            Delete Food
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        id="notification_name"
                        name="notification_name"
                        className="border"
                        value={value.name}
                        onChange={(e) => {
                          const updatedFood = new Map(food);
                          const foodItem = updatedFood.get(key);
                          if (foodItem) {
                            foodItem.name = e.target.value;
                            setFood(updatedFood);
                          }
                        }}
                      ></input>
                    </div>

                    <div className="flex justify-center gap-4">
                      <div className="flex flex-col w-full">
                        <label htmlFor="notification_quantity">Quantity:</label>
                        <input
                          type="number"
                          id="notification_quantity"
                          name="notification_quantity"
                          className="border"
                          min={0}
                          value={value.quantity}
                          onChange={(e) => {
                            const updatedFood = new Map(food);
                            const foodItem = updatedFood.get(key);
                            if (foodItem) {
                              foodItem.quantity = Number(e.target.value);
                              setFood(updatedFood);
                            }
                          }}
                        ></input>
                      </div>
                      <div className="flex flex-col w-full">
                        <label htmlFor="notification_unit">Unit:</label>
                        <input
                          type="text"
                          id="notification_unit"
                          name="notification_unit"
                          className="border"
                          value={value.units}
                          onChange={(e) => {
                            const updatedFood = new Map(food);
                            const foodItem = updatedFood.get(key);
                            if (foodItem) {
                              foodItem.units = e.target.value;
                              setFood(updatedFood);
                            }
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                ))}
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

        {page === 1 && notification.type != "Food" && (
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
                  defaultValue={notification.dosageQuantity || 0}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      dosageQuantity: Number(e.target.value),
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
                  defaultValue={notification.dosageUnit}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      dosageUnit: e.target.value,
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
                  defaultValue={notification.frequencyQuantity}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      frequencyQuantity: Number(e.target.value),
                    })
                  }
                ></input>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="frequency_unit">Frequency Unit:</label>
                <select
                  id="frequency_unit"
                  className="border"
                  defaultValue={notification.frequencyUnit}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      frequencyUnit: e.target.value,
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

        {((page === 2 && notification.type != "Food") ||
          (page === 1 && notification.type === "Food")) && (
          <section className="section">
            <h2 className="heading2">Notification Schedule</h2>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col w-full">
                {numbers.map((num: number, index: number) => (
                  <div key={index}>
                    <label htmlFor="time">{`Time for dosage ${num}:`}</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      className="border"
                      defaultValue={notification.time[index]}
                      onChange={(e) => {
                        const updatedTime = [...notification.time];
                        updatedTime[index] = e.target.value;
                        setNotification({
                          ...notification,
                          time: updatedTime,
                        });
                      }}
                    ></input>

                    <div className="flex flex-col">
                      <label htmlFor="isRepeating">Repeating?</label>
                      <select
                        name="isRepeating"
                        id="isRepeating"
                        className="border"
                        defaultValue={notification.repeating[index]}
                        onChange={(e) => {
                          const updatedRepeating = [...notification.repeating];
                          updatedRepeating[index] = e.target.value;
                          setNotification({
                            ...notification,
                            repeating: updatedRepeating,
                          });
                        }}
                      >
                        {RepeatingType.map((repeating, index) => (
                          <option key={index} value={repeating}>
                            {repeating}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="day">Day:</label>
                      <select
                        name="day"
                        id="day"
                        className="border"
                        defaultValue={notification.day[index]}
                        onChange={(e) => {
                          const updatedDay = [...notification.day];
                          updatedDay[index] = e.target.value;
                          setNotification({
                            ...notification,
                            day: updatedDay,
                          });
                        }}
                      >
                        {daysOfTheWeek.map((day, index) => (
                          <option key={index} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
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
                        defaultValue={notification.endDate[index]}
                        onChange={(e) => {
                          const updatedEndDate = [...notification.endDate];
                          updatedEndDate[index] = e.target.value;
                          setNotification({
                            ...notification,
                            endDate: updatedEndDate,
                          });
                        }}
                      ></input>
                    </div>
                  </div>
                ))}
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
                className=" w-full py-2 border"
              >
                Next
              </button>
            </Button>
          </section>
        )}

        {((page === 3 && notification.type != "Food") ||
          (page === 2 && notification.type === "Food")) && (
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
              <button
                type="submit"
                className="w-full py-2 border"
                onClick={handleSubmitClick}
              >
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
