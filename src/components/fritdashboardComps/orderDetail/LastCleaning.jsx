import { Box, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { globalDataContext } from "../../../context/ContextProvider";
import Text from "../../../languages/Text";
import UseFetchMemory from "../../customHooks/UseFetchMemory";
import { getCleaningText } from "./helper";

const LastCleaning = () => {
  const { globalData } = useContext(globalDataContext);
  const { lineData } = globalData;
  const { data: lastCleaningResponse } = UseFetchMemory({
    request: "lastCleaning",
    customParams: {
      entId: lineData.entId,
    },
  });
  let state, lastClean;

  if (lastCleaningResponse) {
    state = lastCleaningResponse[0].Estado;
    lastClean = lastCleaningResponse[0].UltimaLimpieza;
  }
  const text = getCleaningText(lastClean);
  return (
    <>
      <Grid item xs={6}>
        <strong>{Text({ tid: "lastCleaning" })}</strong>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <span>{text}</span>
        {/* {lastClean && (lastClean === "" || lastClean === "S") ? (
          <span>
            Limpieza
            <br />
            en Seco
          </span>
        ) : lastClean === "P" ? (
          <span>
            Limpieza con
            <br />
            Producto
          </span>
        ) : lastClean === "A" ? (
          <span>
            Limpieza
            <br />
            con Agua
          </span>
        ) : (
          "-"
        )} */}
      </Grid>
      <Grid item xs={6}>
        <strong>{Text({ tid: "state" })}</strong>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <Typography>
          <span
            style={{
              paddingInline: "12px",
              backgroundColor:
                state === "Limpio"
                  ? "lightskyblue" //</Typography>"#70f5a7" //background.success"
                  : state === "Sucio" && "#9c7a4860", // "background.warning"
            }}
          >
            {state ? state.toUpperCase() : "-"}
          </span>
        </Typography>
      </Grid>
    </>
  );
};

export default LastCleaning;
