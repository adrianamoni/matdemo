import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { get_oee_shift } from "../../services/OFservices";
import { MemoryDatabaseCall } from "../../services/Service";
import LineProgress from "../../widgets/progress/LineProgress";

const OeeTurno = ({ line }) => {
  const [apiData, setApiData] = useState(undefined);
  useEffect(() => {
    let mountedComp = true;
    let clearTimeoutKey;
    const fetchData = async () => {
      const filter = [
        {
          filterExpression: null,
          filterItem: {
            column: "ent_id",
            dataType: "INT",
            value: line.entId,
            filterItemType: "Equal",
            checkDBNull: false,
          },
        },
      ];

      const response = await MemoryDatabaseCall({
        params: get_oee_shift({ filter }),
        url: "queryDataFrameDataAsync",
      });
      if (response && mountedComp) {
        if (response.length > 0) {
          setApiData(response);
        }
      }
      clearTimeoutKey = setTimeout(fetchData, 60000);
    };

    fetchData();

    return () => {
      mountedComp = false;
      clearTimeout(clearTimeoutKey);
    };
    //eslint-disable-next-line
  }, []);

  return (
    <Card>
      <CardHeader component="div" title={`OEE TURNO ${line.ent_name}`} />
      <CardContent>
        <Grid container alignItems="center">
          {apiData && apiData.length > 0 ? (
            <LineProgress
              value={apiData[0].OEE ? parseFloat(apiData[0].OEE) / 100 : 0}
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
