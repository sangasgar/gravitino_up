import { useEffect, useState } from "react";

import Collapse from "@mui/material/Collapse";

import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import { Calendar } from "./Calendar";
import ru from "date-fns/locale/ru";
import DataPicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("ru", ru);
export default function Sidebar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" absolute  top-0 right-0">
      <div
        className="justify-center items-center relactive flex hover:cursor-pointer   bg-[#FFFFFF]  h-[80px] w-[350px]"
        onClick={() => setOpen(!open)}
      >
        <div className="justify-center items-center flex place-items-center font-pop text-[20px] select-none  text-[#3F434A] font-[700]">
          {currentTime.toLocaleDateString() +
            " " +
            currentTime.getHours() +
            ":"}
          {currentTime.getMinutes() < 10
            ? `0${currentTime.getMinutes()}`
            : currentTime.getMinutes()}
          <div className="absolute  right-10  justify-end items-end flex">
            {open ? (
              <ChevronUpCircle size={20} color="#3F434A" />
            ) : (
              <ChevronDownCircle size={20} color="#3F434A" />
            )}
          </div>
        </div>
      </div>
      <div className="bg-white select-none text-black ">
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="">
            <DataPicker
              locale="ru"
              selected={startDate}
              onChange={(date) => {
                if (date !== null) setStartDate(date);
              }}
              inline
            />
          </div>
        </Collapse>
      </div>
    </div>
  );
}
