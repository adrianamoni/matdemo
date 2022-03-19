import React, { useContext, useState, useEffect } from "react";
import useWindowSize from "../../customHooks/UseWindowsSize";
import { loginContext, formContext } from "../../../context/ContextProvider";
import { Grid } from "@mui/material";
import { createNotification } from "../../alerts/NotificationAlert";
import { ApiCall } from "../../../services/Service";
import { loginObj } from "../../../services/serviceHelper";
import ModalWidget from "../../../widgets/modalWidget/ModalWidget";
import InputWidget from "../../../widgets/forms/InputWidget";
import ButtonGroupWidget from "../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "../../../languages/Text";

const LoginModal = ({ loginModal, setLoginModal }) => {
  const windowSize = useWindowSize();
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;

  //useContext
  const { loggedUser, setLoggedUser } = useContext(loginContext);
  const { formWidget, setformWidget } = useContext(formContext);
  //useState
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    let userName = formWidget.loginForm.username;
    let userPassword = formWidget.loginForm.password;
    const response = await ApiCall({
      params: loginObj({ userName, userPassword }),
    });
    if (response.responseError) {
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
      setLoading(false);
    } else {
      const userInfo = {
        permissions: response.responseData.Permisos,
        sessionId: response.responseData.SessionId,
        userId: response.responseData.UserId,
        isLogged: true,
      };

      sessionStorage.setItem(
        `UserInfo_${PROJECT_NAME}`,
        JSON.stringify(userInfo)
      );
      setLoggedUser(userInfo);

      createNotification({
        status: "success",
        msg: "loginSuccess",
        hide: response.responseHide,
      });
      setformWidget({ ...formWidget, loginForm: [] });
      setLoading(false);
      close(false); //close modal
    }
  };
  useEffect(() => {
    if (loggedUser && loggedUser.hasOwnProperty("userId")) {
      close(false);
    }
    //eslint-disable-next-line
  }, [loggedUser]);

  const handleSubmit = () => {
    fetchData();
  };

  const close = () => {
    setformWidget({ ...formWidget, loginForm: [] });
    setLoginModal(false);
  };

  const modalContent = (
    <>
      <Grid container sx={{ justifyContent: "center", mt: "25px" }}>
        <Grid item sx={{ width: "50%" }}>
          <InputWidget
            formId={"loginForm"}
            id={"username"}
            label={<Text tid={"user"} />}
            required={true}
            multiline={false}
            type="text"
            maxLength={100}
            disabled={false}
            placeholder={""}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: "center", mt: "25px" }}>
        <Grid item sx={{ width: "50%" }}>
          <InputWidget
            formId={"loginForm"}
            id={"password"}
            label={<Text tid={"password"} />}
            required={true}
            multiline={false}
            type="password"
            maxLength={100}
            disabled={false}
            placeholder={""}
          />
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
              text: "yes",
              color: "primary",
              onClick: handleSubmit,
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
      title={"login"}
      open={loginModal}
      close={close}
      content={modalContent}
      customWidth={windowSize.width < 620 ? 350 : 800}
    />
  );
};

export default LoginModal;
