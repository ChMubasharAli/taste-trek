import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const { isLoggedIn, open } = useContext(StoreContext);

  const navigateToLogin = () => {
    navigate("/");
    open();
  };

  if (!isLoggedIn) {
    // Redirect to login and pass the current location in the state to redirect back after login
    navigateToLogin();
    return null;
  }
  return element; // Render the protected route if authenticated
};

export default PrivateRoute;
