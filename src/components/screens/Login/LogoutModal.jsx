import React, { useContext, useState } from "react";
import useWindowSize from "../../customHooks/UseWindowsSize";
import { useNavigate, useLocation } from "react-router-dom";
import { loginContext } from "../../../context/ContextProvider";
import { Grid, Typography } from "@mui/material";
import { createNotification } from "../../alerts/NotificationAlert";
import { ApiCall } from "../../../services/Service";
import { logoutObj } from "../../../services/serviceHelper";
import ModalWidget from "../../../widgets/modalWidget/ModalWidget";
import ButtonGroupWidget from "../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "../../../languages/Text";

const LogoutModal = ({ logoutModal, setLogoutModal }) => {
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;
  const windowSize = useWindowSize();
  const { pathname } = useLocation();
  let navigate = useNavigate();

  //useContext
  const { setLoggedUser } = useContext(loginContext);
  //useState
  const [loading, setLoading] = useState(false);

  const handleConfirmLogout = (e) => {
    sessionStorage.removeItem(`UserInfo_${PROJECT_NAME}`);
    setLoggedUser({
      userName: "",
      isLogged: false,
      sessionId: null,
      permissions: [],
    });
    fetchLogout();
    setLogoutModal(false);
    (pathname === "/secuenciacion" || pathname === "/gestor-paros") &&
      navigate("/");
  };

  const fetchLogout = async () => {
    const response = await ApiCall({ params: logoutObj });
    if (response.responseError) {
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      createNotification({
        status: "success",
        msg: "logoutSuccess",
        hide: response.responseHide,
      });
    }
  };

  const close = () => {
    setLogoutModal(false);
  };

  const modalContent = (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Typography sx={{ padding: "25px" }}>
            {Text({ tid: "confirmLogout" })}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <ButtonGroupWidget
          position="right"
          buttons={[
            {
              text: "cancel",
              color: "primary",
              onClick: close,
              disabled: false,
            },
            {
              text: "accept",
              color: "secondary",
              onClick: handleConfirmLogout,
              disabled: false,
            },
          ]}
          loading={loading}
        />
      </Grid>
    </>
  );

  return (
    <ModalWidget
      title={"logout"}
      open={logoutModal}
      close={close}
      content={modalContent}
      customWidth={windowSize.width < 620 ? 350 : 800}
    />
  );
};

export default LogoutModal;
