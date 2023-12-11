import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard/page";
import { MainLayuot } from "./components/Layout";
import NotFoundpage from "./pages/notfound/page";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<MainLayuot />}>
            <Route index element={<DashboardPage />} />
            <Route path="*" element={<NotFoundpage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
