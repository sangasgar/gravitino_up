import { Link } from "react-router-dom";
import { LineChart } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import ListItemButton from "@mui/material/ListItemButton";

function ReportsLink({
  props,
  path,
  title,
}: {
  props: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  path: string;
  title: string;
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
          <div className="flex items-center justify-center gap-3">
            <LineChart
              strokeWidth={path === "/reports" ? 3 : 2.4}
              size={20}
              color="#3F434A"
            />

            <div>
              {props.open && (
                <div
                  className={
                    path === "/reports"
                      ? "font-[600]"
                      : "font-[400]" +
                        "font-pop text-[15px] font-normal text-[#3F434A]"
                  }
                >
                  Отчеты
                </div>
              )}
            </div>
          </div>
        </ListItemButton>
      </Link>
    </div>
  );
}

export default ReportsLink;
