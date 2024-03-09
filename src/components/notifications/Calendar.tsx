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
import { NotificationModalData, activeNotifType } from "@/types/notifications";

const Calendar = () => {
  const [currentDaySelected, setCurrentDaySelected] = useState<Date>(
    new Date()
  );
  const [notification, setNotification] = useState<NotificationModalData[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeNotif, setActiveNotif] = useState<activeNotifType[]>([]);

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startingDayIndex = getDay(firstDayOfMonth);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  useEffect(() => {
    const newActiveNotif: activeNotifType[] = [];
    notification.forEach((notif) => {
      if (!newActiveNotif.some((item) => item.type === notif.type)) {
        newActiveNotif.push({
          type: notif.type,
          checked: false,
        });
      }
    });
    setActiveNotif(newActiveNotif);
  }, [notification]);

  useEffect(() => {}, [currentDaySelected]);

  // Placeholder for current user: clte5s2lp0000st8dcrhqf8jt
  useEffect(() => {
    fetch(
      `http://localhost:3001/notifications/user/clte5s2lp0000st8dcrhqf8jt`,
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
  }, []);

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

  const handleCheckbox = (i: number) => {
    if (activeNotif[i]) {
      let checkbox = document.getElementById(
        `${activeNotif[i].type} checkbox`
      ) as HTMLInputElement;
      if (checkbox.checked) {
        activeNotif[i].checked = true;
      } else {
        activeNotif[i].checked = false;
      }
    }
    setActiveNotif([...activeNotif]);
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
                <div key={`empty-${index}`} className="relative border py-4" />
              );
            })}
            {daysInMonth.map((dayNum) => (
              <div
                key={`${currentDate.getMonth()} ${dayNum}`}
                className={`relative border py-4 ${
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
                      notif.createdAt?.toString().slice(8, 10) ===
                        format(dayNum, "dd") && (
                        <div
                          key={index}
                          className={`${
                            notif.type === "Medicine" &&
                            activeNotif.some(
                              (item) =>
                                item.type === notif.type &&
                                item.checked === true
                            )
                              ? "border p-1 bg-orange-300 rounded-full"
                              : null
                          } ${
                            notif.type === "Food" &&
                            activeNotif.some(
                              (item) =>
                                item.type === notif.type &&
                                item.checked === true
                            )
                              ? "border p-1 bg-violet-300 rounded-full"
                              : null
                          } ${
                            notif.type === "Water" &&
                            activeNotif.some(
                              (item) =>
                                item.type === notif.type &&
                                item.checked === true
                            )
                              ? "border p-1 bg-sky-300 rounded-full"
                              : null
                          }`}
                        />
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full px-4 pt-2 py-32">
          <div className="text-[20px] font-bold p-2">Filters:</div>
          <div className="flex flex-row w-full justify-around">
            <div className="flex flex-col w-1/2 gap-3">
              <div className="border text-center py-1">By Type</div>
              {activeNotif.map((notif, i) => {
                return (
                  <div
                    key={`${notif.type}${i}`}
                    className="flex flex-row gap-4 justify-start pl-16"
                  >
                    <input
                      type="checkbox"
                      id={`${notif.type} checkbox`}
                      name={`${notif.type} checkbox`}
                      defaultChecked={notif.checked}
                      onClick={() => handleCheckbox(i)}
                    />
                    <div>{notif.type}</div>
                  </div>
                );
              })}
            </div>
            <div className="w-1/2">
              <div className="border text-center py-1">By Name</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <AlertNotification currentDaySelected={currentDaySelected} />
      </div>
    </div>
  );
};

export default Calendar;
