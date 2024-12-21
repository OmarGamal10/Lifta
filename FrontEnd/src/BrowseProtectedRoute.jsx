import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useHttp from "./hooks/useHTTP";
import Loader from "./components/Loader";



const BrowseProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isBanned, setIsBanned] = useState(null);
  const [userType, setUserType] = useState(null);
  const { coach_id } = useParams();
  const navigate = useNavigate();
  const { get } = useHttp("http://localhost:3000");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await get("/users/checkAuth");
        // Assuming response.body has these values
        setIsAuthenticated(true);
        setUserType(response.userType);
        setUserId(response.userId);
        setIsBanned(response.is_banned);
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
    return <Navigate to="/log-in" replace />;

    if(isBanned) {
      return <Navigate to="/banned" />;
    }
  
    
  if(coach_id) {
    console.log("hi", coach_id);
    return React.cloneElement(children, { userId: coach_id });
  }
  if (userType === "Trainer") {
    return <Navigate to="/profile" replace />;
  }

  // If authenticated, render the children with additional props
  return React.cloneElement(children, { userId });
};

export default BrowseProtectedRoute;
