import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
//import LoadingSpinner from "./LoadingSpinner"; // Create or import a loading component

// export default function DefaultLayout() {
//   const { user, token, loading } = useStateContext();
//   const navigate = useNavigate();
//   // Redirect to login if no token
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Show loading spinner while data is being fetched
//   if (loading || !user) {
//     return <div>Loading...</div>;
//   }

//   // Redirect if user doesn't have a profile picture
//   if (!user.profile_picture_id) {
//     return <Navigate to="/addphoto-signup" replace />;
//   }

//   // All checks passed - render the protected content
//   return <Outlet />;
// }

// AuthLayout.jsx - Checks authentication only
export default function AuthLayout() {
  const { token,loading } = useStateContext();
  
  if (loading) {
    return <div>Loading</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}

// ProfileCompleteGuard.jsx - Checks profile completion
export function ProfileCompleteGuard() {
  const { user, loading } = useStateContext();

  // Show loading spinner while user data is being fetched
  if (loading || user === null) {
    return <div>Loading</div>;
  }

  // Redirect if user doesn't have a profile picture
  if (!user?.profile_picture_id) {
    return <Navigate to="/addphoto-signup" replace />;
  }

  // All checks passed - render the child routes
  return <Outlet />;
}