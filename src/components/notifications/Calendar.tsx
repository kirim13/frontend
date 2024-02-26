import { MouseEventHandler, useEffect, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isToday,
  startOfMonth,
} from "date-fns";

const Calendar = () => {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDaysAbbr = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  const [currentMonth, setCurrentMonth] = useState(format(new Date(), "MMMM"));
  const [currentYear, setCurrentYear] = useState(format(new Date(), "yyyy"));
  const [currentDaySelected, setCurrentDaySelected] = useState<Date | null>(
    null
  );

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  useEffect(() => {
    setCurrentMonth(format(new Date(), "MMMM"));
    setCurrentYear(format(new Date(), "yyyy"));
  }, []);

  const handleDayClick = (dayNum: Date) => {
    setCurrentDaySelected(dayNum);
  };

  return (
    <div>
      <div className="title flex items-center font-bold border">
        {`${currentMonth} ${currentYear}`}
      </div>
      <div className="p-4 h-full">
        <div className=" grid grid-cols-7 gap-2">
          {weekDaysAbbr.map((day) => (
            <div key={day} className="text-center">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((dayNum) => (
            <div
              key={`${currentMonth} ${dayNum}`}
              className={`relative font-bold border p-6 text-[20px] 
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
          ))}
        </div>
      </div>
      <div className="border px-4 p-2">Filters</div>
    </div>
  );
};

export default Calendar;
