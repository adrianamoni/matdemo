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
  const { globalData } = useContext(globalDataContext);
  const [apiData, setApiData] = useState(undefined);
  const [OEEData, setOEEData] = useState(undefined);

  useEffect(() => {
    let clearTimeoutTurnoKey;

    const filter = [
      {
        filterExpression: null,
        filterItem: {
          column: "Tagname",
          dataType: "String",
          value: globalData.lineData.entName,
          filterItemType: "StartsWith",
          checkDBNull: false,
        },
      },
    ];
    const fetchTurno = async () => {
      let response = await MemoryDatabaseCall({
        params: get_oee_shift({ filter }),
        url: "queryWWDataFrameDataAsync",
      });
      if (response) {
        if (response.length > 0) {
          setApiData(response);
        }
      }

      clearTimeoutTurnoKey = setTimeout(
        fetchTurno,
        5000 //60000
      );
    };

    if (globalData && globalData.lineData && globalData.orderData) {
      fetchTurno();
    }

    return () => {
      clearTimeout(clearTimeoutTurnoKey);
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (apiData?.length > 0) {
      let OEEPercentageIndex = apiData.findIndex((obj) => {
        return obj.Tagname.includes("CurrentOEEPercent");
      });
      let OEEAvailableIndex = apiData.findIndex((obj) => {
        return obj.Tagname.includes("CurrentUtilizationPercent");
      });
      let OEEPerformanceIndex = apiData.findIndex((obj) => {
        return obj.Tagname.includes("CurrentPerformancePercent");
      });
      let OEEQualityIndex = apiData.findIndex((obj) => {
        return obj.Tagname.includes("CurrentQualityPercent");
      });

      setOEEData({
        OEEPercentage:
          OEEPercentageIndex != "-1"
            ? apiData[OEEPercentageIndex].Value.toFixed(0)
            : 0,
        available:
          OEEAvailableIndex != "-1"
            ? apiData[OEEAvailableIndex].Value.toFixed(0)
            : 0,
        performance:
          OEEPerformanceIndex != "-1"
            ? apiData[OEEPerformanceIndex].Value.toFixed(0)
            : 0,
        quality:
          OEEQualityIndex != "-1"
            ? apiData[OEEQualityIndex].Value.toFixed(0)
            : 0,
      });
    }
  }, [apiData]);

  return (
    <>
      <Grid container sx={{ height: "100%" }}>
        {/*  <Grid item xs={12}>
          <Typography align="center" variant="h6" component="h6">
            {Text({ tid: "turnOee" })}
          </Typography>
        </Grid> */}

        <Grid item xs={12} /* sx={{ height: "100%" }} */>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={12} lg={6} te>
              <TimelineContainer />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography align="center" variant="h6" component="h6">
                    {Text({ tid: "turnOee" })}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <HalfDoughnut
                    value={[OEEData ? OEEData.OEEPercentage : 0]}
                    color={colorByValue({
                      value:
                        OEEData && OEEData.OEEPercentage != null
                          ? OEEData.OEEPercentage
                          : 0,
                      targetOee: globalData?.lineData?.oeeTarget,
                      yellowThreshold: globalData?.oeeSpecs?.yellowThreshold,
                    })}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
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
                        {OEEData && OEEData.available != null
                          ? Math.round(OEEData.available)
                          : 0}
                        %
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
                        {OEEData && OEEData.performance != null
                          ? Math.round(OEEData.performance)
                          : 0}
                        %
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
                        {OEEData && OEEData.quality != null
                          ? Math.round(OEEData.quality)
                          : 0}
                        %
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OEEHistorico;
