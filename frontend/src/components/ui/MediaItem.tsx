import { CalendarClock, Check } from "lucide-react";

interface IMediaItemProps {
  id: number;
  time: number;
  NumberOrder: string;
  description: string;
  isComplete: boolean;
}

export default function MediaItem({ item }: { item: IMediaItemProps }) {
  return (
    <>
      <div className=" bg-white rounded-2xl  w-[335px]  ">
        <div className="flex p-4  place-content-between w-full">
          <div className="flex place-content-start items-center">
            <CalendarClock size={17} />
            <div className="font-[400] ml-2 font-pop text-[16px] text-[#3F434A]">
              {item.time}
            </div>
          </div>

          <div className="">
            <div
              className={
                item.isComplete
                  ? "bg-green-500 rounded-3xl flex items-center justify-center p-[5px]"
                  : "bg-yellow-500 rounded-3xl flex items-center justify-center p-[5px]"
              }
            >
              <div className="">
                <Check color="white" size={14} />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-dashed">
          <div className="p-4">
            <div className="font-[500]   flex justify-start items-center  font-pop text-[16px] text-[#3F434A]">
              {item.NumberOrder}
            </div>
            <p className="flex font-[400]  font-pop text-[14px] text-[#3F434A] mt-3">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
