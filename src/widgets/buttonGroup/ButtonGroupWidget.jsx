import React from "react";
import { Grid, ButtonGroup, Button } from "@mui/material";
import Text from "./../../languages/Text";

const ButtonGroupWidget = ({ buttons }) => {
  console.log("buttons", buttons);
  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={12}
        md={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <ButtonGroup
          variant="contained"
          //   orientation="vertical"
          aria-label="outlined primary button group"
        >
          {buttons &&
            buttons.map((btn, i) => {
              return (
                <Button
                  variant="contained"
                  color={btn.color}
                  disabled={btn.disabled ? true : false}
                  onClick={
                    btn.onClick
                      ? btn.onClick
                      : () => console.log("no click func")
                  }
                >
                  {Text({ tid: btn.text })}
                </Button>
              );
            })}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default ButtonGroupWidget;
