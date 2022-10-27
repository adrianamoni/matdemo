import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { globalDataContext } from "../../../context/ContextProvider";
import Text from "../../../languages/Text";
import UseFetchMemory from "../../customHooks/UseFetchMemory";
import { getCleaningText } from "./helper";

const LastCleaning = ({ lastCleaningData }) => {
  const { globalData /* , setGlobalData */ } = useContext(globalDataContext);
  const { lineData } = globalData;
  /*   const [status, setStatus] = useState(undefined);
  const [lastClean, setLastClean] = useState(undefined); */

  /*  const { data: lastCleaningResponse } = UseFetchMemory({
    request: "lastCleaning",
    customParams: {
      entId: lineData.entId,
    },
  });

  useEffect(() => {
    if (lastCleaningResponse) {
      setStatus(lastCleaningResponse[0].Estado);
      setLastClean(lastCleaningResponse[0].UltimaLimpieza);

      setGlobalData({
        ...globalData,
        lastCleaningData: {
          state: lastCleaningResponse[0].Estado,
          lastClean: lastCleaningResponse[0].UltimaLimpieza,
          backgroundColor:
            lastCleaningResponse[0].Estado === "Limpio"
              ? "#87cefa"
              : lastCleaningResponse[0].Estado === "Sucio" && "#9c7a4860",
        },
      });
    }
  }, [lastCleaningResponse]); */

  // const text = getCleaningText(lastClean);
  return (
    <>
      <Grid item xs={6}>
        <strong>{Text({ tid: "lastCleaning" })}</strong>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <span>{lastCleaningData?.lastClean}</span>
      </Grid>
      <Grid item xs={6}>
        <strong>{Text({ tid: "state" })}</strong>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <Typography>
          <span
            style={{
              paddingInline: "0.8em",
              paddingBlock: "0.2em",

              color: "#111",
              backgroundColor:
                lastCleaningData?.state === "Limpio"
                  ? "#87cefa"
                  : lastCleaningData?.state === "Sucio" && "#9c7a4860",
            }}
          >
            {lastCleaningData?.state
              ? lastCleaningData?.state.toUpperCase()
              : "-"}
          </span>
        </Typography>
      </Grid>
    </>
  );
};

export default LastCleaning;
