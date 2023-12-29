import { Link } from "react-router-dom";
import { Circle, LineChart, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import ListItemButton from "@mui/material/ListItemButton";

function ReportsLink({
  props,
  path,
  title,
  count,
}: {
  props: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  path: string;
  title: string;
  count: number;
}) {
  if (path === "/reports") {
    document.title = title;
  }
  return (
    <div
      className={
        path === "/reports"
          ? "bg-[#F8F8F8] relative items-center justify-center "
          : "relative items-center justify-center "
      }
    >
      <div
        className={
          path === "/reports"
            ? "h-[100%] absolute border-solid border-l-4 border-[#0784D1] "
            : "absolute"
        }
      >
        &nbsp;
      </div>
      <Link to="/reports">
        <ListItemButton
          sx={{
            py: 1.5,
            "&:hover": {
              bgcolor: "#00FF0000",
            },
          }}
        >
          <div className="flex w-full items-center justify-start gap-x-3 ">
            <LineChart
              strokeWidth={path === "/reports" ? 3 : 2.4}
              size={20}
              color="#3F434A"
            />

            <div className="flex items-center   ">
              {props.open && (
                <div
                  className={
                    path === "/reports"
                      ? "font-[600]"
                      : "font-[400]" +
                        "font-pop text-[15px] font-normal text-[#3F434A] "
                  }
                >
                  Отчеты
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-x-3">
            {count !== 0 && (
              <div className="w-[20px] h-[20px]  rounded-full bg-[#0784D1] flex justify-center items-center">
                <p className="text-white text-[12px]">
                  {count < 10 ? `${count}` : "+9"}
                </p>
              </div>
            )}
          </div>
        </ListItemButton>
      </Link>
    </div>
  );
}

export default ReportsLink;
