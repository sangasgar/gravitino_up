import { Button, Checkbox, FormControlLabel, FormLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchAuth } from "../../redux/reducers/userSlice";

export function SignInPage() {
  const [shown, setShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  document.title = "Авторизация";

  const dispatch = useAppDispatch();

  const OnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchAuth({ login: email, password: password }));
  };

  return (
    <>
      <div className="bg-[#F8F8F8] h-screen w-screen select-none  flex items-center justify-center">
        <form
          onSubmit={OnSubmit}
          className="bg-white relative h-[550px] w-[500px] rounded-2xl flex place-content-center"
        >
          <div className="grid grid-rows-3 ">
            <div className="grid content-around">
              <p className="text-[#0784D1] items-center font-pop font-[700] text-[18px] flex justify-center ">
                ГРАВИТИНО УП
              </p>
              <p className="text-[#3F434A] font-pop font-[500] text-[28px] flex items-center  justify-center  ">
                Войдите в свой аккаунт
              </p>
            </div>
            <div className="grid grid-rows-2 ">
              <div className="row-1">
                <p className="text-[#8A9099] font-pop font-[400] text-[15px] flex items-start  justify-start">
                  Email
                </p>
                <input
                  className="border-[#8A9099] border-[1px] rounded-xl h-[40px] w-[400px] focus: border-solid p-3"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>

              <div className="row-2 relative items-center flex justify-end">
                <div className="relative">
                  <p className="text-[#8A9099] font-pop font-[400] text-[15px] flex items-start  justify-start">
                    Пароль
                  </p>

                  <input
                    className="border-[#8A9099] border-[1px] rounded-xl h-[40px] w-[400px] focus: border-solid p-3"
                    type={shown ? "text" : "password"}
                    value={password}
                    autoComplete="on"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </div>
                <div
                  className="absolute  items-center justify-center mt-6 p-4"
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
            </div>
            <div>
              <div className="row-3 grid grid-cols-2 grid-rows-2 content-around ">
                <div className="flex justify-start   items-center">
                  <FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: "#0784D1",
                            "&.Mui-checked": {
                              color: "#0784D1",
                            },
                          }}
                        />
                      }
                      label={
                        <p className="text-[#595F69] font-pop font-[400] select-none text- text-[15px] flex items-start  justify-start">
                          Запомнить меня
                        </p>
                      }
                    />
                  </FormLabel>

                  <p className="text-[#595F69] font-pop font-[400] text-[15px] flex items-start  justify-start"></p>
                </div>
                <div className=" flex justify-end items-center">
                  <Link to="/123">
                    <p className="text-[#0784D1] font-pop font-[400] text-[15px] flex items-end  justify-end hover:underline">
                      Забыли пароль?
                    </p>
                  </Link>
                </div>
                <div className="row-2  col-span-2 justify-center flex  items-center">
                  <Button
                    type="submit"
                    className="rounded-xl h-[40px] w-[400px] bg-[#0784D1] "
                    variant="contained"
                    sx={{ borderRadius: 3 }}
                  >
                    Войти
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 mb-3 flex items-center justify-center gap-1">
            <p className="text-[#8A9099] font-pop font-[400] text-[15px] flex items-end  justify-end ">
              У вас нет учетной записи?
            </p>
            <Link to="/register">
              <p className="text-[#0784D1] font-pop font-[400] text-[15px] flex items-end  justify-end hover:underline">
                Зарегистрироваться
              </p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
