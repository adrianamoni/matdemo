import React from "react";
import { Grid, ButtonGroup, Button } from "@mui/material";
import Text from "./../../languages/Text";
import { LoadingButton } from "@mui/lab";
import useWindowSize from "../../components/customHooks/UseWindowsSize";

const ButtonGroupWidget = ({ position, buttons, loading, size }) => {
  const { width } = useWindowSize();
  // console.log("buttons", buttons);
  /* let customBigSize = {
    p: 3,
    fontSize: "1.5rem",
    fontWeight: "bold",
  };
  if (size === "big") {
  } */
  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          display: "flex",
          justifyContent: width > 900 ? position : "center",
          /*  justifyContent: position, */
          marginTop: "2rem",
        }}
      >
        <ButtonGroup
          // variant="contained"
          //   orientation="vertical"
          /* sx={{ maxWidth: 700 }} */
          fullWidth
          orientation={width < 900 ? "vertical" : "horizontal"}
          /* orientation={"horizontal"} */
          aria-label="outlined primary button group"
        >
          {buttons &&
            buttons.map((btn, i, list) => {
              return !loading ? (
                <Button
                  key={i}
                  variant="contained"
                  color={btn.color}
                  disabled={btn.disabled ? true : false}
                  onClick={
                    btn.onClick
                      ? btn.onClick
                      : () => console.log("no click func")
                  }
                  //SEPARATED BUTTONS STYLE
                  className="separated-button-group"
                  sx={{
                    mr: i < list.length && "15px",
                    ml: i === list.length && "15px",
                    mb: 2,
                    maxWidth: 370,
                    marginInline: width < 900 ? "auto" : undefined,
                  }}
                >
                  {Text({ tid: btn.text })}
                </Button>
              ) : (
                <LoadingButton loading>Submit</LoadingButton>
              );
            })}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default ButtonGroupWidget;
