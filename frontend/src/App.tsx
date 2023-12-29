import { Routes, Route } from "react-router-dom";

import { SignInPage } from "./pages/signin/page";
import { Layuot } from "./components/Layout";
import NotFoundpage from "./pages/notfound/page";

import { DashboardPage } from "./pages/dashboard/page";
import { RegisterPage } from "./pages/register/page";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { fetchRefreshAuth } from "./redux/reducers/userSlice";
import MediaReportspage from "./pages/mediareports/page";
import TaskListPage from "./pages/tasklist/page";
import ReportsPage from "./pages/reports/page";

function App() {
  const dispatch = useAppDispatch();
  const { isLogin, status, user } = useAppSelector((state) => state.auth);
  const path = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    if (
      (isLogin && path.pathname === "/") ||
      (isLogin && path.pathname === "/signin")
    ) {
      navigate("/dashboard");
    }

    if (!isLogin && status !== "loading") {
      navigate("/signin");
    }
  }, [isLogin]);

  window.onstorage = (event) => {
    if (event.key !== "r  efreshToken") return;

    navigate("/signin");
  };

  useEffect(() => {
    let refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken !== null) {
      dispatch(fetchRefreshAuth(refreshToken));
    } else {
      navigate("/signin");
    }
  }, []);
  if (status === "loading") return <></>;

  return (
    <>
      <div>
        <Routes>
          {user && (
            <Route path="/" element={<Layuot />}>
              <Route index path="dashboard" element={<DashboardPage />} />

              <Route path="mediareports" element={<MediaReportspage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="tasklist" element={<TaskListPage />} />
              <Route path="*" element={<NotFoundpage />} />
            </Route>
          )}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundpage />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
