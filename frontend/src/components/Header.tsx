import { Avatar, Badge, Divider, IconButton } from "@mui/material";
import {
  User,
  ChevronDown,
  Search,
  ChevronRight,
  ChevronLeft,
  BellIcon,
  LogOut,
} from "lucide-react";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchLogout } from "../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

export function Header({
  props,
}: {
  props: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
}) {
  const [chevron, setChevron] = useState(false);
  useEffect(() => {
    setChevron(!chevron);
  }, [props.open, props.setOpen]);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-[50px_auto]  items-center min-w-full bg-white h-16 border-solid border-l-[2px] border-b-[2px] ">
      <div
        className="items-center cursor-pointer justify-center ml-3"
        onClick={() => props.setOpen(!props.open)}
      >
        {chevron ? (
          <ChevronLeft size={20} color="#3F434A" />
        ) : (
          <ChevronRight size={20} color="#3F434A" />
        )}
      </div>
      <div className="flex  items-center place-items-end justify-end gap-3 p-[10px]   ">
        <div className="flex items-center gap-4">
          <Search size={20} />

          <IconButton aria-label="bell">
            <Badge color="info" variant="dot">
              <BellIcon color="#3F434A" size={20} />
            </Badge>
          </IconButton>
        </div>
        <Divider
          orientation="vertical"
          className=""
          flexItem
          variant="middle"
        />
        <div className="flex items-center mr-5 gap-3">
          <Avatar alt="Ava" src="" sx={{ width: 40, height: 40 }}>
            <User />
          </Avatar>

          <div className="font-pop text-[14px] text-[#3F434A]">
            {`${user?.person.last_name} ${user?.person.first_name}`}
          </div>
          {/*<ChevronDown size={16} />*/}
          <LogOut
            size={16}
            onClick={() => {
              dispatch(fetchLogout());
              //navigate("/signin");
            }}
          />
        </div>
      </div>
    </div>
  );
}
