import React, { useState, useEffect, useContext } from "react";
import { Card, Grid, List, ListItem, Typography } from "@mui/material";
import { globalDataContext } from "../../../context/ContextProvider";
import HalfDoughnut from "../../../widgets/halfDoughnut/HalfDoughnut";
import { get_oee_order } from "../../../services/OFservices";
import Text from "./../../../languages/Text";
import { MemoryDatabaseCall } from "../../../services/Service";
import { colorByValue } from "../../../helpers/props";

const OeeOrden = () => {
  const { globalData } = useContext(globalDataContext);
  const [apiData, setApiData] = useState(undefined);
  const [OEEData, setOEEData] = useState(undefined);

  useEffect(() => {
    let clearTimeoutTurnoKey;

    const fetch = async () => {
      let entId = globalData.lineData.entId;
      let response = await MemoryDatabaseCall({
        params: get_oee_order({ entId }),
        url: "queryDataAsync",
      });
      if (response) {
        if (response.length > 0) {
          setApiData(response);
        }
      }

      clearTimeoutTurnoKey = setTimeout(fetch, 60000);
    };

    if (globalData && globalData.lineData && globalData.orderData) {
      fetch();
    }

    return () => {
      clearTimeout(clearTimeoutTurnoKey);
    };
  }, []);

  return (
    <>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Typography align="center" variant="h6" component="h6">
            {Text({ tid: "orderOee" })}
          </Typography>
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Grid container justifyContent="center" sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={6} lg={12}>
              <HalfDoughnut
                value={[apiData?.OEE && apiData.OEE != null ? apiData.OEE : 0]}
                color={colorByValue({
                  value: apiData?.OEE && apiData.OEE != null ? apiData.OEE : 0,
                  targetOee: globalData?.lineData?.oeeTarget,
                  yellowThreshold: globalData?.oeeSpecs?.yellowThreshold,
                })}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OeeOrden;
