import { Plus, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CreateTaskDialog from "../../components/ui/dialogs/CreateTask";

export default function TaskListPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("Все");
  return (
    <div className="grid grid-rows-10 p-7 gap-4 w-full">
      <div className="flex items-center justify-start font-[700] font-pop text-[28px] gap-3 text-[#3F434A]">
        <p>Список задач</p>
        <CreateTaskDialog />

        <div className="bg-white border-solid border-[2px] rounded-3xl flex items-center justify-center p-[7px]">
          <div className="">
            <RefreshCw color="black" size={17} />
          </div>
        </div>
      </div>
      <div className="row-2 mt-10 flex border-solid border-b-2 gap-x-9 items-center ">
        <div className="gap-2" onClick={() => setFilter("Все")}>
          <div className="flex items-center gap-1 justify-start cursor-pointer">
            <p
              className={
                filter === "Все"
                  ? "text-[#3F434A] font-[400] font-pop text-[15px]  "
                  : "text-[#8A9099] font-[400] font-pop text-[15px]  "
              }
            >
              Все
            </p>
            <div className="bg-[#E8E9EB] border-solid border-[2px] rounded-md flex items-center justify-center p-[3px]">
              <div className="font-[400] font-pop text-[10px]  text-[#3F434A]">
                400
              </div>
            </div>
          </div>
          {filter === "Все" ? (
            <div className="flex-grow h-[2px] mt-2 w-full rounded-xl  bg-[#0784D1]">
              &nbsp;
            </div>
          ) : (
            <div className="flex-grow h-[2px] mt-2 w-full rounded-xl  bg-transparent">
              &nbsp;
            </div>
          )}
        </div>
        <div className=" gap-2" onClick={() => setFilter("Сделано")}>
          <div className="flex items-center gap-1 justify-start cursor-pointer">
            <p
              className={
                filter === "Сделано"
                  ? "text-[#3F434A] font-[400] font-pop text-[15px]  "
                  : "text-[#8A9099] font-[400] font-pop text-[15px]  "
              }
            >
              Сделано
            </p>
            <div className="bg-[#E8E9EB] border-solid border-[2px] rounded-md flex items-center justify-center p-[3px]">
              <div className="font-[400] font-pop text-[10px]  text-[#3F434A]">
                90
              </div>
            </div>
          </div>

          {filter === "Сделано" ? (
            <div className="flex-grow h-[2px] mt-2 w-full rounded-xl  bg-[#0784D1]">
              &nbsp;
            </div>
          ) : (
            <div className="flex-grow h-[2px] mt-2 w-full rounded-xl  bg-transparent">
              &nbsp;
            </div>
          )}
        </div>
        <div className=" gap-2" onClick={() => setFilter("Закрыто")}>
          <div className="flex items-center gap-1 justify-start cursor-pointer">
            <p
              className={
                filter === "Закрыто"
                  ? "text-[#3F434A] font-[400] font-pop text-[15px]  "
                  : "text-[#8A9099] font-[400] font-pop text-[15px]  "
              }
            >
              Закрыто
            </p>
            <div className="bg-[#E8E9EB] border-solid border-[2px] rounded-md flex items-center justify-center p-[3px]">
              <div className="font-[400] font-pop text-[10px]  text-[#3F434A]">
                150
              </div>
            </div>
          </div>
          {filter === "Закрыто" ? (
            <div className="flex-grow h-[2px] mt-2 w-full rounded-xl  bg-[#0784D1]">
              &nbsp;
            </div>
          ) : (
            <div className="flex-grow h-[2px] mt-2 w-full rounded-xl  bg-transparent">
              &nbsp;
            </div>
          )}
        </div>
      </div>
      <div className=" flex flex-wrap gap-4 items-center justify-start  w-full">
        <div className="bg-white rounded-2xl w-full h-[37px] border-solid border-[1px]  flex items-center justify-start">
          <div className="ml-3 mr-3">
            <Search color="#8A9099" size={20} />
          </div>
          <div className="flex-auto ">
            <input
              className="w-full focus:outline-none "
              value={search}
              placeholder="Искать..."
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
