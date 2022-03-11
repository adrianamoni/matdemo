import React, { useEffect, useState } from "react";
import { Icon, Message } from "semantic-ui-react";
/* import { dictionary } from "./dictionary"; */

const AlertModal = ({
  status,
  code,
  msg,
  hide,
  type,
  setNotificationModal,
  size,
  aligned,
  fullWidth,
}) => {
  const [autoClose, setAutoClose] = useState(undefined);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    hide === 1
      ? status === "error"
        ? setAutoClose(8000)
        : setAutoClose(3500)
      : setAutoClose(0);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    autoClose &&
      autoClose !== 0 &&
      setTimeout(() => {
        setVisible(false);
        setAutoClose(undefined);
        setNotificationModal && setNotificationModal(undefined);
      }, autoClose);
    //eslint-disable-next-line
  }, [autoClose]);

  return visible ? (
    <Message
      size={size}
      style={{
        marginTop: size === "huge" ? 10 : 0,
        padding:
          size === "huge"
            ? "15px 20px"
            : size === "large"
            ? "10px 15px"
            : "4px 10px",
        fontSize:
          size === "huge" ? "1.3em" : size === "large" ? "1em" : "0.65em",
        alignSelf: "center",
        width: fullWidth ? "100%" : "auto",
      }}
      error={status === "error"}
      info={status === "info"}
      warning={status === "warning"}
      success={status === "success"}
    >
      <Message.Content>
        <Icon
          style={{ marginTop: "-3px" }}
          name={
            status === "error" || status === "warning"
              ? "exclamation triangle"
              : status === "info"
              ? "info circle"
              : "check circle"
          }
          size={(size === "huge" || size === "large") && "large"}
        />
        <Message.Header style={{ fontWeight: 400, display: "inline" }}>
          {/* {dictionary(code, msg)} REVIEW */}
          {msg}
        </Message.Header>
      </Message.Content>
    </Message>
  ) : (
    <></>
  );
};

AlertModal.defaultProps = {
  status: "info",
  msg: "",
  hide: 1,
  type: "modal",
  size: "tiny",
  aligned: "left",
};

export default AlertModal;
