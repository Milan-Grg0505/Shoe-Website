import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


const ProtectedRoute = ({ children, allowedRoles }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {


    const checkAuth = async () => {

      
      try {
        const response = await axios.get("http://localhost:8000/api/auth/verify", {
          withCredentials: true, // Include cookies
        });

        console.log(response.data);
        const userRole = response.data.role;
        if (allowedRoles.includes(userRole)) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }


    };


    checkAuth();

  }, [allowedRoles, navigate]);

  if (isLoading) return <p>Loading...</p>;
  return isAuthenticated ? children : <Navigate to="/login" />;

};


export default ProtectedRoute;
