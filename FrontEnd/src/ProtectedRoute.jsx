import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useHttp from "./hooks/useHTTP";



const ProtectedRoute = ({ children }) => {
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
    return <div>Loading...</div>; // Or a spinner/loading component
  }

  if (isAuthenticated === false) {
    return <Navigate to="/log-in" />;
  }

  // If authenticated, render children
  return React.cloneElement(children, { userId });
};

export default ProtectedRoute;
