import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function NotFoundPage() {
  document.title = "Страница не найдена";
  const { isLogin } = useAppSelector((state) => state.auth);

  return (
    <div className="grid grid-rows-3 justify-center items-center">
      <div className="row-1">404 erors</div>

      <div className="row-2">NotFound</div>
      <div className="row-3">
        {!isLogin ? (
          <Link className="underline" to="/dashboard">
            To Dashboard
          </Link>
        ) : (
          <Link className="underline" to="/signin">
            To Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
