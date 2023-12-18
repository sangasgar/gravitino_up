import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="grid grid-rows-3 justify-center items-center">
      <div className="row-1">404 erors</div>

      <div className="row-2">NotFound</div>
      <div className="row-3">
        <Link className="underline" to="/">
          To Home
        </Link>
      </div>
    </div>
  );
}
