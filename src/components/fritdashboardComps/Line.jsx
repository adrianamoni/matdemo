import React, { useState, useEffect } from "react";
/* import MonthlyCleaningBox from "./Cleaning/MonthlyCleaningBox";
import OeeTurnoBox from "../../common/OeeTurnoBox"; */
import { MemoryDatabaseCall } from "../../services/Service";
import { get_cleaning_orders } from "../../services/OFservices";
import { get_next_orders } from "../../services/serviceHelper";
import _ from "lodash";
/* import OeeChartBoxWithChart from "../../common/OeeChartBox/OeeChartBoxWithChart"; */
import Grid from "@mui/material/Grid";
import CardItem from "./CardItem";
import { blue, green, orange } from "@mui/material/colors";
import OeeTurno from "./OeeTurno";
import OeeChartBox from "./OeeChartBox";
import MonthlyCleaningBox from "./MonthlyCleaningBox";
import { Divider } from "@mui/material";

const Line = ({ line }) => {
  const [monthlyCleaningData, setMonthlyCleaningData] = useState(undefined);
  const [currentOrders, setCurrentOrders] = useState(undefined);
  useEffect(
    () => {
      let mountedComp = true;
      let clearNextOrdersTimeout;
      let clearCleaningTimeout;

      const fetchNextOrders = async () => {
        const filter = [
          {
            filterExpression: null,
            filterItem: {
              column: "EntId",
              dataType: "INT",
              value: line.entId,
              filterItemType: "Equal",
              checkDBNull: false,
            },
          },
        ];

        const response = await MemoryDatabaseCall({
          params: get_next_orders({ filter }),
          url: "queryDataFrameDataAsync",
        });
        if (response && mountedComp) {
          if (response.length > 0) {
            const currentOrdersArr = response.filter(
              (order) => order.RowNum === 1
            );

            setCurrentOrders(currentOrdersArr);
          }
        }
        clearNextOrdersTimeout = setTimeout(fetchNextOrders, 120000);
      };

      const fetchMonthlyCleaningData = async () => {
        const filter = [
          {
            filterExpression: null,
            filterItem: {
              column: "ent",
              dataType: "INT",
              value: line.entId,
              filterItemType: "Equal",
              checkDBNull: false,
            },
          },
        ];

        const response = await MemoryDatabaseCall({
          params: get_cleaning_orders({ filter }),
          url: "queryDataFrameDataAsync",
        });

        if (response && mountedComp) {
          if (response.length > 0) {
            const newArr = _.orderBy(response, ["seq_no"], ["desc"]);
            setMonthlyCleaningData(newArr);
          }
        }
        clearCleaningTimeout = setTimeout(fetchMonthlyCleaningData, 120000);
      };

      fetchNextOrders();
      fetchMonthlyCleaningData();
      return () => {
        mountedComp = false;
        clearTimeout(clearNextOrdersTimeout);
        clearTimeout(clearCleaningTimeout);
      };
    },
    //eslint-disable-next-line
    [
      /* line */
    ]
  );

  return (
    <>
      <Grid
        container
        item
        spacing={3}
        xs={12}
        sm={12}
        md={12}
        lg={4}
        justifyContent={"center"}
        sx={{ mb: 3 }}
      >
        <Grid item style={{ width: "100%" }}>
          <OeeTurno line={line} />
        </Grid>

        <Grid item style={{ width: "100%" }}>
          <OeeChartBox
            line={line}
            showChart={true}
            order={
              currentOrders && currentOrders.length > 0 && currentOrders[0]
            }
          />
        </Grid>
        <Grid item style={{ width: "100%", textAlign: "center" }}>
          <MonthlyCleaningBox
            line={line}
            /* cleaningData={monthlyCleaningData[0]}
            currentOrder={
              currentOrders &&
              currentOrders.length > 0 &&
              currentOrders[0].wo_id
            } */
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Line;
