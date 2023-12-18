import { Link } from "react-router-dom";
import { Truck } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import ListItemButton from "@mui/material/ListItemButton";

function CarsLink({
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
  if (path === "/cars") {
    document.title = title;
  }

  return (
    <div
      className={
        path === "/cars"
          ? "bg-[#F8F8F8] relative items-center justify-center "
          : "relative items-center justify-center "
      }
    >
      <div
        className={
          path === "/cars"
            ? "h-[100%] absolute border-solid border-l-4 border-[#0784D1] "
            : "absolute"
        }
      >
        &nbsp;
      </div>
      <Link to="/cars">
        <ListItemButton
          sx={{
            py: 1.5,
            "&:hover": {
              bgcolor: "#00FF0000",
            },
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <Truck
              strokeWidth={path === "/cars" ? 3 : 2.4}
              size={20}
              color="#3F434A"
            />

            <div>
              {props.open && (
                <div
                  className={
                    path === "/cars"
                      ? "font-[600]"
                      : "font-[400]" +
                        "font-pop text-[15px] font-normal text-[#3F434A]"
                  }
                >
                  Машины
                </div>
              )}
            </div>
          </div>
        </ListItemButton>
      </Link>
    </div>
  );
}

export default CarsLink;
