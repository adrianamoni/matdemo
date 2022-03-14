import { Typography } from "@mui/material";
import React from "react";

const LogoutModal = () => {
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;

  const handleClick = (e) => {
    e.preventDefault();
    const userInfo = {
      userName: "aleix",
      isLogged: true,
      isAdmin: false,
      permissions: [{ desc: "Secuenciacion.Visualizacion" }],
    };
    sessionStorage.setItem(
      `UserInfo_${PROJECT_NAME}`,
      JSON.stringify(userInfo)
    );
  };
  return (
    <div className="App">
      <form className="form">
        <button onClick={handleClick}>LOGIN</button>
      </form>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </div>
  );
};

export default LogoutModal;
