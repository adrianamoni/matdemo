import React, { useState, useEffect, useContext } from "react";
/* import { get_oee_shift } from "../../services/OFservices";
import { MemoryDatabaseCall } from "../../services/Service"; */

import { Card, Grid, List, ListItem, Typography } from "@mui/material";
import HalfDoughnut from "../../../widgets/halfDoughnut/HalfDoughnut";
import { Timeline } from "@mui/icons-material";
import { globalDataContext } from "../../../context/ContextProvider";
import Text from "../../../languages/Text";
import { get_oee_shift } from "../../../services/OFservices";
import { MemoryDatabaseCall } from "../../../services/Service";
import { colorByValue } from "../../../helpers/props";
import TimelineContainer from "./TimelineContainer";

const OEEHistorico = () => {
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;
  const { globalData } = useContext(globalDataContext);
  const [apiData, setApiData] = useState(undefined);

  useEffect(() => {
    let clearTimeoutTurnoKey;

    const filter = [
      {
        filterExpression: null,
        filterItem: {
          column: "ent_id",
          dataType: "INT",
          value: globalData.lineData.entId,
          filterItemType: "Equal",
          checkDBNull: false,
        },
      },
    ];
    const fetchTurno = async () => {
      let response = await MemoryDatabaseCall({
        params: get_oee_shift({ filter }),
        url: "queryDataFrameDataAsync",
      });
      if (response) {
        if (response.length > 0) {
          setApiData(response[0]);
        }
      }

      clearTimeoutTurnoKey = setTimeout(fetchTurno, 60000);
    };

    if (globalData && globalData.lineData && globalData.orderData) {
      fetchTurno();
    }

    return () => {
      clearTimeout(clearTimeoutTurnoKey);
    };
    //eslint-disable-next-line
  }, []);

  let dispOEE, rendOEE, calOEE;
  dispOEE = apiData ? apiData.Disponibilidad * 100 : 0;
  rendOEE = apiData ? apiData.Rendimiento * 100 : 0;
  calOEE = apiData ? apiData.Calidad * 100 : 0;
  return (
    <>
      <Grid
        container
        item
        sx={{
          margin: 0,
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <TimelineContainer />
        </Grid>
        <Grid item xs={12} md={3}>
          <HalfDoughnut
            value={[apiData ? apiData.OEE / 100 : 0]}
            color={colorByValue({
              value: apiData && apiData.OEE ? apiData.OEE / 100 : 0,
              targetOee: globalData?.lineData?.oeeTarget,
              yellowThreshold: globalData?.oeeSpecs?.yellowThreshold,
            })}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <List>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>
                    <strong>{Text({ tid: "availability" })}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">
                    {dispOEE ? Math.round(dispOEE) : 0}%
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>
                    <strong>{Text({ tid: "performance" })}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">
                    {rendOEE ? Math.round(rendOEE) : 0}%
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>
                    <strong>{Text({ tid: "quality" })}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">
                    {calOEE ? Math.round(calOEE) : 0}%
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default OEEHistorico;
