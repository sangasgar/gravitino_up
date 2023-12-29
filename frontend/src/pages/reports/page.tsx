import { Plus } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="grid grid-rows-10 p-7 gap-4 w-full">
      <div className="flex items-center justify-start font-[700] font-pop text-[28px] gap-3 text-[#3F434A]">
        <p>Отчёты</p>

        <div className="bg-[#0784D1] rounded-3xl flex items-center justify-center p-[7px]">
          <div className="">
            <Plus color="white" size={17} />
          </div>
        </div>
      </div>
    </div>
  );
}
