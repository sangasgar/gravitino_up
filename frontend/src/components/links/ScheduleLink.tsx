import { Link } from "react-router-dom";
import { CalendarClock, Dot, ChevronDown, ChevronUp } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";

function ScheduleLink({
  props,
  path,
}: {
  props: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  path: string;
}) {
  const [report, setReport] = useState(false);

  useEffect(() => {
    setReport(false);
    if (
      (path === "/schedule" ||
        path === "/references" ||
        path === "/settings") &&
      props.open
    ) {
      setReport(true);
    }
  }, [props.open, props.setOpen]);

  if (path === "/schedule") {
    document.title = "Расписание";
  }
  if (path === "/references") {
    document.title = "Группы рассылки";
  }
  if (path === "/settings") {
    document.title = "Настройки дашбоарда";
  }

  return (
    <>
      <div
        className={
          path === "/schedule" || path === "/references" || path === "/settings"
            ? "bg-[#F8F8F8] relative items-center justify-center "
            : "relative items-center justify-center "
        }
      >
        <div
          className={
            path === "/schedule" ||
            path === "/references" ||
            path === "/settings"
              ? "h-[100%] absolute border-solid border-l-4 border-[#0784D1] "
              : "absolute"
          }
        >
          &nbsp;
        </div>
        <ListItemButton
          sx={{
            py: 1.5,
            "&:hover": {
              bgcolor: "#00FF0000",
            },
          }}
          onClick={() => {
            setReport(!report);
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <CalendarClock
              strokeWidth={
                path === "/schedule" ||
                path === "/references" ||
                path === "/settings"
                  ? 3
                  : 2.4
              }
              size={20}
              color="#3F434A"
            />

            {props.open && (
              <div
                className={
                  path === "/schedule" ||
                  path === "/references" ||
                  path === "/settings"
                    ? "font-[600]"
                    : "font-[400]" +
                      "font-pop text-[15px] font-normal text-[#3F434A]"
                }
              >
                Расписание Отчетов
              </div>
            )}
            {props.open && (
              <>
                {report ? (
                  <ChevronUp
                    strokeWidth={
                      path === "/schedule" ||
                      path === "/references" ||
                      path === "/settings"
                        ? 3
                        : 2.4
                    }
                    size={20}
                    color="#3F434A"
                  />
                ) : (
                  <ChevronDown
                    strokeWidth={
                      path === "/schedule" ||
                      path === "/references" ||
                      path === "/settings"
                        ? 3
                        : 2.4
                    }
                    size={20}
                    color="#3F434A"
                  />
                )}
              </>
            )}
          </div>
        </ListItemButton>
      </div>
      <Collapse in={report && props.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <div
            className={
              path === "/schedule"
                ? "bg-[#F8F8F8] relative items-center justify-center "
                : "relative items-center justify-center "
            }
          >
            <div
              className={
                path === "/schedule"
                  ? "h-[100%] absolute border-solid border-l-4 border-[#0784D1] "
                  : "absolute"
              }
            >
              &nbsp;
            </div>
            <Link to="/schedule">
              <ListItemButton
                sx={{
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#00FF0000",
                  },
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Dot
                    strokeWidth={path === "/schedule" ? 3 : 2.4}
                    size={20}
                    color="#3F434A"
                  />

                  <div>
                    {props.open && (
                      <div
                        className={
                          path === "/schedule"
                            ? "font-[600]"
                            : "font-[400]" +
                              "font-pop text-[15px] font-normal text-[#3F434A]"
                        }
                      >
                        Расписание
                      </div>
                    )}
                  </div>
                </div>
              </ListItemButton>
            </Link>
          </div>
          <div
            className={
              path === "/references"
                ? "bg-[#F8F8F8] relative items-center justify-center "
                : "relative items-center justify-center "
            }
          >
            <div
              className={
                path === "/references"
                  ? "h-[100%] absolute border-solid border-l-4 border-[#0784D1] "
                  : "absolute"
              }
            >
              &nbsp;
            </div>
            <Link to="/references">
              <ListItemButton
                sx={{
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#00FF0000",
                  },
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Dot
                    strokeWidth={path === "/references" ? 3 : 2.4}
                    size={20}
                    color="#3F434A"
                  />

                  <div>
                    {props.open && (
                      <div
                        className={
                          path === "/references"
                            ? "font-[600]"
                            : "font-[400]" +
                              "font-pop text-[15px] font-normal text-[#3F434A]"
                        }
                      >
                        Группы рассылки
                      </div>
                    )}
                  </div>
                </div>
              </ListItemButton>
            </Link>
          </div>
          <div
            className={
              path === "/settings"
                ? "bg-[#F8F8F8] relative items-center justify-center "
                : "relative items-center justify-center "
            }
          >
            <div
              className={
                path === "/settings"
                  ? "h-[100%] absolute border-solid border-l-4 border-[#0784D1] "
                  : "absolute"
              }
            >
              &nbsp;
            </div>
            <Link to="/settings">
              <ListItemButton
                sx={{
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#00FF0000",
                  },
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Dot
                    strokeWidth={path === "/settings" ? 3 : 2.4}
                    size={20}
                    color="#3F434A"
                  />

                  <div>
                    {props.open && (
                      <div
                        className={
                          path === "/settings"
                            ? "font-[600]"
                            : "font-[400]" +
                              "font-pop text-[15px] font-normal text-[#3F434A]"
                        }
                      >
                        Настройки дашбоарда
                      </div>
                    )}
                  </div>
                </div>
              </ListItemButton>
            </Link>
          </div>
        </List>
      </Collapse>
    </>
  );
}

export default ScheduleLink;
