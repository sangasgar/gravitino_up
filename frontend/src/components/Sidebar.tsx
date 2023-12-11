import { useEffect, useState } from "react";

import List from "@mui/material/List";

import Collapse from "@mui/material/Collapse";

import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
export default function Sidebar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    console.log(currentTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" absolute top-0 right-0">
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
      <div className="bg-black select-none text-white min-h-[50%] ">
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div>
            <div className="h-30 w-full">1</div>
            <div className="h-30 w-full">1</div>
            <div className="h-30 w-full">1</div>
            <div className="h-30 w-full">1</div>
            <div className="h-30 w-full">1</div>
            <div className="h-30 w-full">1</div>
            <div className="h-30 w-full">1</div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}
