import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from "../../languages/Text";
import { get_oee_shift } from "../../services/OFservices";
import { MemoryDatabaseCall } from "../../services/Service";
import LineProgress from "../../widgets/progress/LineProgress";

const OeeTurno = ({ line }) => {
  const [apiData, setApiData] = useState(undefined);
  const [OEEData, setOEEData] = useState(undefined);
  useEffect(() => {
    let mountedComp = true;
    let clearTimeoutKey;
    const fetchData = async () => {
      const filter = [
        {
          filterExpression: null,
          filterItem: {
            column: "Tagname",
            dataType: "String",
            value: line.ent_name,
            filterItemType: "StartsWith",
            checkDBNull: false,
          },
        },
      ];

      const response = await MemoryDatabaseCall({
        params: get_oee_shift({ filter }),
        url: "queryWWDataFrameDataAsync",
      });
      if (response && mountedComp) {
        if (response.length > 0) {
          setApiData(response);
        }
      }
      clearTimeoutKey = setTimeout(
        fetchData,
        5000 //60000
      );
    };

    fetchData();

    return () => {
      mountedComp = false;
      clearTimeout(clearTimeoutKey);
    };
    //eslint-disable-next-line
  }, []);
  const cardTitle = `OEE ${Text({ tid: "turn" })} ${line.ent_name}`;

  useEffect(() => {
    if (apiData?.length > 0) {
      let OEEPercentageIndex = apiData.findIndex((obj) => {
        return obj.Tagname.includes("CurrentOEEPercent");
      });
      setOEEData({
        OEEPercentage:
          OEEPercentageIndex != "-1"
            ? apiData[OEEPercentageIndex].Value.toFixed(0)
            : 0,
      });
    }
  }, [apiData]);

  return (
    <Card sx={{ backgroundColor: "background.grey4" }}>
      <CardHeader component="div" title={cardTitle.toUpperCase()} />
      <CardContent>
        <Grid container alignItems="center">
          {apiData && apiData.length > 0 ? (
            <LineProgress
              value={
                OEEData?.OEEPercentage ? parseFloat(OEEData.OEEPercentage) : 0
              }
            />
          ) : (
            <LineProgress value={0} />
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OeeTurno;
