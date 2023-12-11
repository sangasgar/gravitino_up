import { Dispatch, SetStateAction, useEffect, useState } from "react";

import List from "@mui/material/List";
import { useLocation } from "react-router-dom";
import DashboardLink from "./links/DashboardLink";
import ScheduleLink from "./links/ScheduleLink";
import ReportsLink from "./links/ReportsLink";
import CarsLink from "./links/CarsLink";
import MapsLink from "./links/MapsLink";
import PlannerLink from "./links/PlannerLink";
import MediaReportsLink from "./links/MediaReportsLink";
import StaffLink from "./links/StaffLink";
import AdminLink from "./links/AdminLink";
import TaskListLink from "./links/TaskListLink";
import DebugLink from "./links/DebugLink";

export function Navbar({
  props,
}: {
  props: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
}) {
  const path = useLocation();

  return (
    <div className="bg-white grid grid-rows-[64px_auto] border-solid  min-h-screen ">
      {props.open ? (
        <div className="text-[#0784D1] items-center font-pop font-bold text-[18px] flex justify-center ">
          ГРАВИТИНО УП
        </div>
      ) : (
        <div className="text-[#0784D1]  items-center flex justify-center "></div>
      )}

      <List
        component="nav"
        sx={{ p: 0 }}
        aria-labelledby="nested-list-subheader"
      >
        <DashboardLink props={props} path={path.pathname} title="Дашбоард" />
        <ScheduleLink props={props} path={path.pathname} />
        <ReportsLink props={props} path={path.pathname} title="Отчеты" />
        <CarsLink props={props} path={path.pathname} title="Машины" />
        <MapsLink props={props} path={path.pathname} title="Карты" />
        <PlannerLink props={props} path={path.pathname} title="Планировщик" />
        <MediaReportsLink
          props={props}
          path={path.pathname}
          title="Проверка медиаотчётов"
        />
        <StaffLink props={props} path={path.pathname} title="Учет кадров" />
        <DebugLink
          props={props}
          path={path.pathname}
          title="Отслеживание изменений"
        />
        <AdminLink
          props={props}
          path={path.pathname}
          title="Администрирование"
        />
        <TaskListLink props={props} path={path.pathname} title="Список задач" />
      </List>
    </div>
  );
}
