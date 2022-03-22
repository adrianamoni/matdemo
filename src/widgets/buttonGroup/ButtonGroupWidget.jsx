import React from "react";
import { Grid, ButtonGroup, Button } from "@mui/material";
import Text from "./../../languages/Text";
import { LoadingButton } from "@mui/lab";

const ButtonGroupWidget = ({ position, buttons, loading, size }) => {
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
        sx={{ display: "flex", justifyContent: position, marginTop: "25px" }}
      >
        <ButtonGroup
          // variant="contained"
          //   orientation="vertical"
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
                    marginRight: i === 0 && "15px",
                    marginLeft: i === list.length && "15px",
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
