import { useEffect, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isToday,
  startOfMonth,
} from "date-fns";
import AlertNotification from "./AlertNotification";
import { weekDaysAbbr } from "@/constants";
import { NotificationModalData, activeNotifType } from "@/types/notifications";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), "MMMM"));
  const [currentYear, setCurrentYear] = useState(format(new Date(), "yyyy"));
  const [currentDaySelected, setCurrentDaySelected] = useState<Date>(
    new Date()
  );
  const [notification, setNotification] = useState<NotificationModalData[]>([]);

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const [activeNotif, setActiveNotif] = useState<activeNotifType[]>([]);

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
  }, []); // empty array means the effect will run once

  useEffect(() => {
    setCurrentMonth(format(new Date(), "MMMM"));
    setCurrentYear(format(new Date(), "yyyy"));
  }, []);

  const handleDayClick = (dayNum: Date) => {
    setCurrentDaySelected(dayNum);
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
        <div className="title flex items-center font-bold border">
          {`${currentMonth} ${currentYear}`}
        </div>
        <div className="p-6 border h-3/5 pb-8">
          <div className=" grid grid-cols-7 w-full gap-2">
            {weekDaysAbbr.map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((dayNum) => (
              <div
                key={`${currentMonth} ${dayNum}`}
                className="relative w-full"
              >
                <div
                  className={`font-bold border p-7 text-[26px]
                ${isToday(dayNum) ? "border-green-500" : null}
                ${
                  currentDaySelected?.getDate() === dayNum?.getDate()
                    ? "border-red-500"
                    : null
                }`}
                  onClick={() => handleDayClick(dayNum)}
                >
                  <p className="absolute bottom-0 left-0 pl-1">
                    {format(dayNum, "d")}
                  </p>
                </div>
                {notification.map(
                  (notif, index) =>
                    notif.createdAt?.toString().slice(8, 10) ===
                      format(dayNum, "dd") && (
                      <div
                        key={index}
                        className="absolute top-0 right-0 h-full flex mt-0.5 mr-0.5 gap-y-0.5"
                      >
                        <div
                          className={`${
                            notif.type === "Medicine" &&
                            activeNotif.some(
                              (item) =>
                                item.type === notif.type &&
                                item.checked === true
                            )
                              ? "border h-1/6 px-1 bg-orange-300 rounded-full"
                              : null
                          } ${
                            notif.type === "Food" &&
                            activeNotif.some(
                              (item) =>
                                item.type === notif.type &&
                                item.checked === true
                            )
                              ? "border h-1/6 px-1 bg-violet-300 rounded-full"
                              : null
                          } ${
                            notif.type === "Water" &&
                            activeNotif.some(
                              (item) =>
                                item.type === notif.type &&
                                item.checked === true
                            )
                              ? "border h-1/6 px-1 bg-sky-300 rounded-full"
                              : null
                          }`}
                        />
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full  h-1/5 px-4 pt-2">
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
