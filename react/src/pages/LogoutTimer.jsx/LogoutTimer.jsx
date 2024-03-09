import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../service/storageService";

const LogoutTimer = () => {
  const navigate = useNavigate();
  let inactivityTimeout = useRef(null);

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimeout.current);
    inactivityTimeout.current = setTimeout(logoutUser, 4 * 60 * 60 * 1000); // 4 hours in milliseconds
  };

  const logoutUser = () => {
    removeToken(); 

    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const handleActivity = () => resetInactivityTimer();

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);

    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
    };
  }, []);

  useEffect(() => {
    resetInactivityTimer();
  }, []);

  return;
};

export default LogoutTimer;
