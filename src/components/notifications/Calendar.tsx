import { MouseEvent, useEffect, useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import AlertNotification from "./AlertNotification";
import { weekDaysAbbr } from "@/constants";
import {
  ActiveNames,
  ActiveTypes,
  NotificationModalData,
  UserPets,
} from "@/types/notifications";

const Calendar = () => {
  const [currentDaySelected, setCurrentDaySelected] = useState<Date>(
    new Date()
  );
  const [notification, setNotification] = useState<NotificationModalData[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [userPets, setUserPets] = useState<UserPets>({});
  const [activeNames, setActiveNames] = useState<ActiveNames>({});
  const [activeTypes, setActiveTypes] = useState<ActiveTypes>({});

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startingDayIndex = getDay(firstDayOfMonth);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  useEffect(() => {}, [currentDaySelected]);

  useEffect(() => {
    fetch("http://localhost:3001/users/clte5s2lp0000st8dcrhqf8jt", {
      method: "GET",
    })
      .then(async (res) => {
        const userData = await res.json();
        const petData = userData.pets.reduce((acc: any, pet: any) => {
          const petName = `${pet.firstName} ${pet.lastName}`;
          const petId = pet.id;
          if (!acc[pet.type]) {
            acc[pet.type] = {};
            setActiveNames(acc[pet.type]);
          }
          if (!acc[pet.type][petId]) {
            acc[pet.type][petId] = {
              notifications: {},
              name: petName,
              checked: false,
            };
          }
          pet.notifications.forEach((notification: any) => {
            if (!acc[pet.type][petId].notifications[notification.type]) {
              acc[pet.type][petId].notifications[notification.type] = [];
              setActiveTypes(acc[pet.type][petId].notifications);
            }
            acc[pet.type][petId].notifications[notification.type].push(
              notification.id
            );
          });
          return acc;
        }, {});
        setUserPets((prev) => ({
          ...prev,
          ...petData,
        }));

        if (!res.ok) {
          const error = res.statusText;
          return Promise.reject(error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // empty array means the effect will run once

  const handleDayClick = (dayNum: Date) => {
    setCurrentDaySelected(dayNum);
  };

  const handleMonthClick = (index: number, event: MouseEvent) => {
    event.preventDefault();
    let monthButton = document.querySelectorAll("#monthButton")[index];
    if (monthButton.innerHTML === "&lt;") {
      let year = 0;
      if (currentDate.getMonth() === 12) {
        year = -1;
      }
      const result = add(currentDate, {
        years: year,
        months: -1,
      });
      setCurrentDate(result);
    } else if (monthButton.innerHTML === "&gt;") {
      let year = 0;
      if (currentDate.getMonth() === 12) {
        year = 1;
      }
      const result = add(currentDate, {
        years: year,
        months: 1,
      });
      setCurrentDate(result);
    }
  };

  const handleNameCheckbox = (checkboxType: string, i: number) => {
    setActiveNames((prevActiveNames) => ({
      ...prevActiveNames,
      [checkboxType]: {
        ...prevActiveNames[checkboxType],
        checked: !prevActiveNames[checkboxType]?.checked,
        name: prevActiveNames[checkboxType].name,
      },
    }));
    fetch(`http://localhost:3001/users/petData/johnsmith1/${checkboxType}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res: any) => {
      const data = await res.json();
      let index = 0;
      setNotification(
        data.pets[0].notifications.reduce((arr: any, curr: any) => {
          arr[index++] = curr;
          return arr;
        }, [])
      );
    });
  };

  const handleTypeCheckbox = (checkboxType: string, i: number) => {
    setActiveTypes((prevActiveTypes) => ({
      ...prevActiveTypes,
      [checkboxType]: {
        ...prevActiveTypes[checkboxType],
        checked: !prevActiveTypes[checkboxType]?.checked,
      },
    }));
  };

  return (
    <div className="w-full h-full border flex flex-row">
      <div className="w-1/2">
        <div className="flex flex-row w-full">
          <div className="title flex items-center font-bold w-1/2">
            {`${format(currentDate, "MMMM")} ${format(currentDate, "yyyy")}`}
          </div>
          <div className="flex flex-row justify-end w-1/2 px-6 gap-4">
            <button
              id="monthButton"
              onClick={(e) => handleMonthClick(0, e)}
              className="font-bold text-[24px]"
            >
              &lt;
            </button>
            <button
              id="monthButton"
              onClick={(e) => handleMonthClick(1, e)}
              className="font-bold text-[24px]"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="p-6 border h-3/5 pb-8">
          <div className="grid grid-cols-7 gap-1">
            {weekDaysAbbr.map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 h-full">
            {Array.from({ length: startingDayIndex }).map((_, index) => {
              return (
                <div
                  key={`empty-${index}`}
                  className="relative border py-4 h-full"
                />
              );
            })}
            {daysInMonth.map((dayNum) => (
              <div key={`${currentDate.getMonth()} ${dayNum}`}>
                <div
                  className={`relative border py-4 h-full ${
                    currentDaySelected?.getDate() === dayNum?.getDate()
                      ? " border-red-500"
                      : null
                  }
                ${isToday(dayNum) ? " border-green-500" : null}
                `}
                  onClick={() => handleDayClick(dayNum)}
                >
                  <p
                    className={`absolute bottom-0 left-0 font-bold text-[24px] px-1
                `}
                  >
                    {format(dayNum, "d")}
                  </p>
                  <div className="absolute top-0 right-0 flex flex-col gap-y-0.5 mt-0.5 mr-0.5">
                    {notification.map(
                      (notif: NotificationModalData, index: number) =>
                        notif.createdAt?.toString().slice(0, 10) ===
                          dayNum.toISOString().slice(0, 10) && (
                          <div key={index}>
                            <div
                              className={`${
                                notif.type === "Medicine" &&
                                activeTypes[notif.type].checked &&
                                activeNames[notif.petId].checked
                                  ? "border p-1 bg-orange-300 rounded-full"
                                  : null
                              } ${
                                notif.type === "Food" &&
                                activeTypes[notif.type].checked
                                  ? "border p-1 bg-violet-300 rounded-full"
                                  : null
                              } ${
                                notif.type === "Water" &&
                                activeTypes[notif.type].checked
                                  ? "border p-1 bg-sky-300 rounded-full"
                                  : null
                              }`}
                            />
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full px-4 pt-2 py-32">
          <div className="text-[20px] font-bold p-2">Filters:</div>
          <div className="flex flex-row w-full justify-around">
            <div className="w-1/2">
              <div className="border text-center py-1">By Type</div>
              <div className="border h-full">
                {Object.keys(activeTypes).map((type, i) => (
                  <div
                    key={type}
                    className="mt-1 flex flex-row justify-center gap-4"
                  >
                    {type}
                    <input
                      type="checkbox"
                      id={`${type} checkbox`}
                      name={`${type} checkbox`}
                      defaultChecked={activeTypes[type].checked}
                      onClick={() => handleTypeCheckbox(type, i)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <div className="border text-center py-1">By Name</div>
              <div className="border h-full">
                {Object.keys(activeNames).map((id, i) => (
                  <div
                    key={id}
                    className="mt-1 flex flex-row justify-center gap-4"
                  >
                    {`${activeNames[id].name}`}
                    <input
                      type="checkbox"
                      id={`${name} checkbox`}
                      name={`${name} checkbox`}
                      defaultChecked={activeNames[id].checked}
                      onClick={() => handleNameCheckbox(id, i)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <AlertNotification
          currentDaySelected={currentDaySelected}
          notifications={notification}
          activeNames={activeNames}
          activeTypes={activeTypes}
        />
      </div>
    </div>
  );
};

export default Calendar;
