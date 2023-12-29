import { Button, Checkbox, FormControlLabel, FormLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export function RegisterPage() {
  const [shown, setShown] = useState(false);
  const [repeat, setRepeat] = useState(false);
  let navigate = useNavigate();

  document.title = "Зарегистрироваться";

  return (
    <>
      <div className="bg-[#F8F8F8] h-screen w-screen select-none  flex items-center justify-center">
        <div className="bg-white relative h-[650px] w-[500px] rounded-2xl flex place-content-center">
          <div className="grid grid-rows-[auto] ">
            <div className="row-1 gap-2 grid content-around">
              <p className="text-[#0784D1] mt-12 items-center font-pop font-[700] text-[18px] flex justify-center ">
                ГРАВИТИНО УП
              </p>
              <p className="text-[#3F434A] font-pop font-[500] text-[28px] flex items-center  justify-center  ">
                Зарегистрироваться
              </p>
            </div>
            <div className="row-2  grid grid-rows-4  ">
              <div className="row-1">
                <p className="text-[#8A9099] font-pop font-[400] text-[15px] flex items-start  justify-start">
                  ФИО
                </p>
                <input
                  className="border-[#8A9099] border-[1px] rounded-xl h-[40px] w-[400px] focus: border-solid p-3"
                  type="text"
                />
              </div>
              <div className="row-2">
                <p className="text-[#8A9099] font-pop font-[400] text-[15px] flex items-start  justify-start">
                  Email
                </p>
                <input
                  className="border-[#8A9099] border-[1px] rounded-xl h-[40px] w-[400px] focus: border-solid p-3"
                  type="email"
                />
              </div>

              <div className="row-3  bottom-0 flex justify-end">
                <div className="relative">
                  <p className="text-[#8A9099] font-pop font-[400] text-[15px] flex items-start  justify-start">
                    Пароль
                  </p>

                  <input
                    className="border-[#8A9099] border-[1px] rounded-xl h-[40px] w-[400px] focus: border-solid p-3"
                    type={shown ? "text" : "password"}
                  />
                </div>
                <div
                  className="absolute  items-center justify-center mt-[17px] p-4"
                  onMouseDown={() => setShown(!shown)}
                  onMouseUp={() => setShown(!shown)}
                >
                  {shown ? (
                    <Eye size={20} strokeWidth={2.4} color="#3F434A" />
                  ) : (
                    <EyeOff size={20} strokeWidth={2.4} color="#3F434A" />
                  )}
                </div>
              </div>
              <div className="row-4 bottom-0 flex justify-end">
                <div className="relative">
                  <p className="text-[#8A9099] font-pop font-[400] text-[15px] flex items-start  justify-start">
                    Подтвердите пароль
                  </p>

                  <input
                    className="border-[#8A9099] border-[1px] rounded-xl h-[40px] w-[400px] focus: border-solid p-3"
                    type={repeat ? "text" : "password"}
                  />
                </div>
                <div
                  className="absolute  items-center justify-center mt-[17px] p-4"
                  onMouseDown={() => setRepeat(!repeat)}
                  onMouseUp={() => setRepeat(!repeat)}
                >
                  {repeat ? (
                    <Eye size={20} strokeWidth={2.4} color="#3F434A" />
                  ) : (
                    <EyeOff size={20} strokeWidth={2.4} color="#3F434A" />
                  )}
                </div>
              </div>
            </div>

            <div className="row-3 grid content-normal mt-8 ">
              <Button
                className="rounded-xl h-[40px]  w-[400px] bg-[#0784D1] "
                variant="contained"
                sx={{ borderRadius: 3 }}
                onClick={() => navigate("/signin")}
              >
                Зарегистрироваться
              </Button>
            </div>
          </div>
          <div className="absolute bottom-3  flex items-center justify-center gap-1">
            <p className="text-[#8A9099] font-pop font-[400] text-[15px] flex items-end  justify-end ">
              У вас уже есть аккаунт?
            </p>
            <Link to="/signin">
              <p className="text-[#0784D1] font-pop font-[400] text-[15px] flex items-end  justify-end hover:underline">
                Войти
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
