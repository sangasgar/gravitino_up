import { Link } from "react-router-dom";
import { Sliders } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import ListItemButton from "@mui/material/ListItemButton";

function AdminLink({
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
  if (path === "/admin") {
    document.title = title;
  }

  return (
    <div
      className={
        path === "/admin"
          ? "bg-[#F8F8F8] relative items-center justify-center "
          : "relative items-center justify-center "
      }
    >
      <div
        className={
          path === "/admin"
            ? "h-[100%] absolute border-solid border-l-4 border-[#0784D1] "
            : "absolute"
        }
      >
        &nbsp;
      </div>
      <Link to="/admin">
        <ListItemButton
          sx={{
            py: 1.5,
            "&:hover": {
              bgcolor: "#00FF0000",
            },
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <Sliders
              strokeWidth={path === "/admin" ? 3 : 2.4}
              size={20}
              color="#3F434A"
            />

            <div>
              {props.open && (
                <div
                  className={
                    path === "/admin"
                      ? "font-[600]"
                      : "font-[400]" +
                        "font-pop text-[15px] font-normal text-[#3F434A]"
                  }
                >
                  Администрирование
                </div>
              )}
            </div>
          </div>
        </ListItemButton>
      </Link>
    </div>
  );
}

export default AdminLink;
