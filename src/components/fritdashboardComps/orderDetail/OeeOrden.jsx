import React, { useState, useEffect, useContext } from "react";
import { Card, Grid, List, ListItem, Typography } from "@mui/material";
import { globalDataContext } from "../../../context/ContextProvider";
import HalfDoughnut from "../../../widgets/halfDoughnut/HalfDoughnut";
import { get_oee_order } from "../../../services/OFservices";
import Text from "./../../../languages/Text";
import { MemoryDatabaseCall } from "../../../services/Service";

const OeeOrden = () => {
  const { globalData } = useContext(globalDataContext);
  const [apiData, setApiData] = useState(undefined);
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

      clearTimeoutTurnoKey = setTimeout(
        fetch,
        5000 //60000
      );
    };

    if (globalData && globalData.lineData && globalData.orderData) {
      fetch();
    }

    return () => {
      clearTimeout(clearTimeoutTurnoKey);
    };
  }, []);

  const value = (apiData && apiData[0]?.OEE) || 0;
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
                value={[
                  globalData.oeeReal && globalData.oeeReal[0]?.OEE
                    ? globalData.oeeReal[0]?.OEE
                    : 0,
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OeeOrden;
