import { useState, useMemo } from "react";

import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import useEscape from "../hooks/useEscape";
import Sidebar from "./Sidebar";

export function MainLayuot() {
  const [open, setOpen] = useState<boolean>(false);
  const props = useMemo(
    () => ({
      setOpen,
      open,
    }),
    [open]
  );

  useEscape(() => setOpen(false));

  return (
    <>
      <main
        className={
          open
            ? "min-h-screen grid grid-cols-[270px_auto]   bg-[#F8F8F8] duration-300  "
            : "min-h-screen grid grid-cols-[70px_auto] bg-[#F8F8F8] duration-300   "
        }
      >
        <div className="col-1">
          <Navbar props={props} />
        </div>

        <div className="grid grid-rows-[65px_auto]  col-2">
          <div className="row-1">
            <Header props={props} />
          </div>

          <div className="bg-[#F8F8F8] relative items-start flex place-items-start justify-start row-2">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
