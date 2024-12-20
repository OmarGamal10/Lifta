import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useHttp from "./hooks/useHTTP";
import Loader from "./components/Loader";



const BrowseProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  const navigate = useNavigate();
  const { get } = useHttp("http://localhost:3000");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await get("/users/checkAuth");
        // Assuming response.body has these values
        setIsAuthenticated(true);
        setUserType(response.userType);
        setUserId(response.userId)
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false); // Set as unauthenticated on error
      }
    };

    checkAuth();
  }, []); // Run once when the component mounts

  // Handle loading or redirect state
  if (isAuthenticated === null) {
    return <Loader />
  }

  if(isAuthenticated === false) 
    return <Navigate to="/" replace />;

  if (userType === "Trainer") {
    return <Navigate to="/profile" replace />;
  }

  // If authenticated, render the children with additional props
  return React.cloneElement(children, { userId });
};

export default BrowseProtectedRoute;