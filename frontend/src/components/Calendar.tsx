import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useState } from "react";

export function Calendar() {
  const today = startOfToday();
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const colStartClasses = [
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="">
        <div className="flex mb-3  items-center justify-between">
          <div className="flex items-center justify-evenly gap-3 sm:gap-12">
            <ChevronLeftIcon
              className="cursor-pointer"
              onClick={getPrevMonth}
            />
          </div>

          <p className="font-pop text-[14px] font-[400] text-[#3F434A]  ">
            {format(firstDayOfMonth, "MMMM yyyy")}
          </p>
          <div className="flex items-center justify-evenly gap-3 sm:gap-12">
            <ChevronRightIcon
              className="cursor-pointer"
              onClick={getNextMonth}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 sm:gap-5 place-items-center">
          {days.map((day, idx) => {
            return (
              <div
                key={idx}
                className=" text-[#8A9099] font-pop text-[14px] font-[400] "
              >
                {capitalizeFirstLetter(day)}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7  sm:gap-5 place-items-center">
          {daysInMonth.map((day, idx) => {
            return (
              <div key={idx} className={colStartClasses[getDay(day)]}>
                <div
                  className={`cursor-pointer flex items-center h-7 w-7 justify-center font-[400] rounded-md  hover:text-white ${
                    isSameMonth(day, today) ? "text-gray-900" : "text-[#8A9099]"
                  } ${!isToday(day) && "hover:bg-[#0784D1]"} ${
                    isToday(day) && "bg-[#0784D1] text-white"
                  }`}
                >
                  {format(day, "d")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const capitalizeFirstLetter = (query: string): string => {
  return query.charAt(0).toUpperCase() + query.substring(1);
};
