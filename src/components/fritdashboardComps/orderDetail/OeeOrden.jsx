import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { globalDataContext } from "../../../context/ContextProvider";
import HalfDoughnut from "../../../widgets/halfDoughnut/HalfDoughnut";
import { get_oee_order } from "../../../services/OFservices";
import Text from "./../../../languages/Text";
import { MemoryDatabaseCall } from "../../../services/Service";

const OeeOrden = ({ energyData, setEnergyData }) => {
  const { globalData } = useContext(globalDataContext);
  // const [energyData, setEnergyData] = useState(undefined);
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
      let res = {
        objetivo: energyObj,
        consumo: parseInt((energyComsuption.Value / energyObj) * 100),
      };
      console.log("energy", res);
      setEnergyData(res);
    }
  };
  useEffect(() => {
    fetchEnergy();
  }, [globalData]);

  return (
    <>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Typography align="center" variant="h6" component="h6">
            {/* {Text({ tid: "orderOee" })} */}
            {Text({ tid: "order" })}
          </Typography>
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Grid container justifyContent="center" sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ marginBottom: "10px" }}>
                <strong>OEE</strong>
              </Typography>
              <HalfDoughnut
                value={[
                  globalData.oeeReal && globalData.oeeReal[0]?.OEE
                    ? globalData.oeeReal[0]?.OEE
                    : 0,
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ marginBottom: "10px" }}>
                <strong> {Text({ tid: "energy" })}</strong>
              </Typography>
              <HalfDoughnut
                value={[energyData?.consumo ? energyData.consumo : 0]}
                stroked
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OeeOrden;
