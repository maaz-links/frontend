import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

export default function GuestLayout() {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/profile" />;
  }

  return (
    // <div id="guestLayout">
      <Outlet />
    // </div>
  );
}
