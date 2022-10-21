import React, { useState, useEffect, useContext } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import HalfDoughnut from "../../../widgets/halfDoughnut/HalfDoughnut";
import {
  globalDataContext,
  pageSizeContext,
} from "../../../context/ContextProvider";
import Text from "../../../languages/Text";
import { get_oee_shift } from "../../../services/OFservices";
import { MemoryDatabaseCall } from "../../../services/Service";
import TimelineContainer from "./TimelineContainer";
import { processData } from "./../../fritdashboardTabs/Signals/helper";
//añadir oee halfdoughnut para energia y consumo
const OEEHistorico = () => {
  const { globalData } = useContext(globalDataContext);
  const { pageSize } = useContext(pageSizeContext);
  const { width } = pageSize;
  const [apiData, setApiData] = useState(undefined);
  const [OEEData, setOEEData] = useState(undefined);
  const [energyData, setEnergyData] = useState({
    objetivo: undefined,
    consumo: undefined,
  });

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
        5000 // 5000
      );
    };
    const fetchEnergy = async () => {
      let response = await MemoryDatabaseCall({
        params: {
          clientName: "WebBrowser",
          dataFrameName: "Energia",
          columns: [],
          filter: null,
        },
        url: "queryWWDataFrameDataAsync",
      });
      if (response) {
        let energyRawData = response.filter((d) =>
          d.Tagname.includes(globalData?.lineData?.entName)
        );
        console.log("energyRawData", energyRawData);
        let energyObj = energyRawData.find(
          (d) =>
            d.Tagname ===
            `${globalData?.lineData?.entName}.ConsumoEnergiaObjetivo`
        );
        energyObj =
          globalData?.orderDetails?.productionData?.qty_reqd * energyObj.Value;
        let energyComsuption = energyRawData.find(
          (d) => d.Tagname === `${globalData?.lineData?.entName}.ConsumoEnergia`
        );
        setEnergyData({
          objetivo: energyObj,
          consumo: parseInt((energyComsuption.Value / energyObj) * 100),
        });
      }
    };

    if (globalData && globalData.lineData && globalData.orderData) {
      fetchTurno();
    }
    fetchEnergy();
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
        <Grid item xs={12}>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={12} lg={4} te>
              <TimelineContainer />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Grid container rowSpacing={1}>
                <Box
                  sx={{ display: "flex", flex: 1, justifyContent: "center" }}
                >
                  <Typography align="center" variant="h6" component="h6">
                    {Text({ tid: "turnOee" })}
                  </Typography>
                </Box>
                <Grid item xs={12}>
                  <HalfDoughnut value={[OEEData ? OEEData.OEEPercentage : 0]} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={2}>
              <List>
                <ListItem>
                  <Grid container sx={{ flex: 1 }}>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>
                          {Text({
                            tid:
                              width > 1500 ? "availability" : "availabilityAbb",
                          })}
                        </strong>
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
                  <Grid container sx={{ flex: 1 }}>
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
                  <Grid container sx={{ flex: 1 }}>
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
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Grid container rowSpacing={1}>
                <Box
                  sx={{ display: "flex", flex: 1, justifyContent: "center" }}
                >
                  <Typography align="center" variant="h6" component="h6">
                    {Text({ tid: "energy" })}
                  </Typography>
                </Box>
                <Grid item xs={12}>
                  <HalfDoughnut value={[energyData?.consumo] || 0} stroked />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OEEHistorico;
