import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import HalfDoughnut from "../../widgets/halfDoughnut/HalfDoughnut";
import Text from "../../languages/Text";
import { MemoryDatabaseCall } from "../../services/Service";
import { get_oee_real } from "../../services/OFservices";
import { colorByValue, propsByState } from "../../helpers/props";
import { globalDataContext } from "../../context/ContextProvider";
/* const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
}); */

const OeeChartBox = ({ showChart, line, order, disableClick }) => {
  const navigateTo = useNavigate();
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;
  const { globalData, setGlobalData } = useContext(globalDataContext);
  const [oeeReal, setOeeReal] = useState(undefined);
  const [stateColor, setStateColor] = useState(["#F0F0F0", "#F0F0F0"]);
  const [raise, setRaise] = useState(false);
  useEffect(
    () => {
      let mountedComp = true;
      let clearTimeoutKey;

      const fetchOeeData = async () => {
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
          params: get_oee_real({ filter }),
          url: "queryDataFrameDataAsync",
        });
        if (response && response.length > 0 && mountedComp) {
          setOeeReal(response);
        }
        clearTimeoutKey = setTimeout(fetchOeeData, 60000);
      };

      if (showChart) {
        fetchOeeData();
      }

      return () => {
        mountedComp = false;
        clearTimeout(clearTimeoutKey);
      };
    },
    //eslint-disable-next-line
    [
      showChart,
      /*, line */
    ]
  );

  useEffect(() => {
    if (order) {
      if (order.state_cd) {
        if (order.state_cd === 4 && order.woStateCd === 3) {
          setStateColor(["#e3e3e3", "#A6A6A6"]); //HARDCODED
        } else {
          const obj = {
            prodState: order.state_cd,
            cleanState: order.StateCdLimpieza,
          };
          const { light, background } = propsByState(obj);
          setStateColor([light, background]);
        }
      }
    }
  }, [order]);

  const handlePush = (e) => {
    localStorage.setItem(
      `LineData_${PROJECT_NAME}`,
      JSON.stringify({ entId: line.entId, entName: line.ent_name })
    );
    localStorage.setItem(
      `OrderData_${PROJECT_NAME}`,
      JSON.stringify({
        woId: order.wo_id,
        operId: order.oper_id,
        seqNo: order.seq_no,
        itemId: order.item_id,
        stateCd: order.state_cd,
        spare3: order.spare3,
      })
    );
    setGlobalData({
      ...globalData,
      orderData: {
        woId: order.wo_id,
        operId: order.oper_id,
        seqNo: order.seq_no,
        itemId: order.item_id,
        stateCd: order.state_cd,
        spare3: order.spare3,
      },
      lineData: { entId: line.entId, entName: line.ent_name },
    });

    navigateTo("/detalle-orden");
  };

  let stockAlert = false;
  let interruptionAlert = false;
  let qualityAlert = false;
  if (order) {
    stockAlert =
      order.hasOwnProperty("RoturaStock") && !!parseFloat(order.RoturaStock);
    qualityAlert =
      order.hasOwnProperty("NumAutocontrolesPendientes") &&
      order.NumAutocontrolesPendientes;
    interruptionAlert =
      order.hasOwnProperty("NumParosPendientes") && order.NumParosPendientes;
  }
  const alerts = { stockAlert, interruptionAlert, qualityAlert };

  return (
    <Card
      raised={raise}
      onMouseEnter={() => setRaise(true)}
      onMouseLeave={() => setRaise(false)}
    >
      <CardActionArea onClick={handlePush}>
        {/* <StyledLink to={`/frit-dashboard`} onClick={handlePush}> */}
        <CardHeader
          component="div"
          sx={{ bgcolor: stateColor[1], color: "#000", mb: 2 }}
          title={line.ent_name}
        />
        {oeeReal ? (
          <HalfDoughnut
            value={[oeeReal[0].OEE || 0]}
            color={colorByValue({
              value: oeeReal[0].OEE || 0,
              targetOee: line.oeeTarget,
              yellowThreshold: globalData?.oeeSpecs?.yellowThreshold,
            })}
          />
        ) : (
          <HalfDoughnut value={[0]} />
        )}
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography sx={{ fontSize: "1.2em" }} gutterBottom>
                <strong>{Text({ tid: "product" })}</strong>
              </Typography>
            </Grid>
            <Grid item xs={7} textAlign="right">
              <Typography variant="body" gutterBottom>
                {order && `${order.item_id} (${order.item_desc})`}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{ fontSize: "1.2em" }} gutterBottom>
                <strong>{Text({ tid: "order" })}</strong>
              </Typography>
            </Grid>
            <Grid item xs={7} textAlign="right">
              <Typography variant="body" gutterBottom>
                {order && order.wo_id}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {/*  </StyledLink> */}
      </CardActionArea>
    </Card>
  );
};

export default OeeChartBox;
