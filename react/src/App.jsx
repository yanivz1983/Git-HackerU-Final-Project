import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import useAutoLogin from "./hooks/useAutoLogin";

import "react-toastify/dist/ReactToastify.css";
import LogoutTimer from "./pages/LogoutTimer.jsx/LogoutTimer";

const App = () => {
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();

  useEffect(() => {
    (async () => {
      try {
        await autoLogin();
      } catch (err) {
        console.log(err);
      } finally {
        setDoneAuth(true);
      }
    })();
  }, []);

  return (
    <LayoutComponent>
      {doneAuth ? (
        <>
          <Router />
          <LogoutTimer /> 
        </>
      ) : (
        <LinearProgress />
      )}
    </LayoutComponent>
  );
};

export default App;
