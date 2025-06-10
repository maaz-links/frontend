import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { ROLES } from "../../../constants";
import { ClipLoader } from "react-spinners";
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
    return <div>
      
      <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
              <ClipLoader color="#E91E63" size={50} />
            </div>
    </div>;
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
    return <div>
      
      <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                    <ClipLoader color="#E91E63" size={50} />
                  </div>
    </div>;
  }

  // Redirect if user doesn't have a profile picture
  if (!user?.profile_picture_id) {
    return <Navigate to="/addphoto-signup" replace />;
  }

  // All checks passed - render the child routes
  return <Outlet />;
}

// ProfileCompleteGuard.jsx - Checks profile completion
export function ProfileCompleteGuard2() {
  const { user, loading,token } = useStateContext();

  if (token) {
    // Show loading spinner while user data is being fetched
    if (loading || user === null) {
      return <div>
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                      <ClipLoader color="#E91E63" size={50} />
                    </div>
      </div>;
    }

    // Redirect if user doesn't have a profile picture
    if (!user?.profile_picture_id) {
      return <Navigate to="/addphoto-signup" replace />;
    }
  }
  

  // All checks passed - render the child routes
  return <Outlet />;
}

export function ShopForMale() {
  const { user} = useStateContext();

  // Redirect if user is not king
  if (user.role != ROLES.KING) {
    return <Navigate to="/" replace />;
  }

  // All checks passed - render the child routes
  return <Outlet />;
}