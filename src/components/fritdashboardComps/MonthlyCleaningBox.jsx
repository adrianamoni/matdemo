import React, { useState, useContext } from "react";

import { styled } from "@mui/material/styles";
import { Grid, Card, CardHeader, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import Text from "../../languages/Text";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const MonthlyCleaningBox = ({ line, cleaningData, currentOrder }) => {
  const [raise, setRaise] = useState(false);
  /*   const { setLine } = useContext(LineContext);
  const { setOrder } = useContext(OrderContext); */

  const handlePush = () => {
    /*     setLine({ entId: line.entId, entName: line.ent_name });
    localStorage.setItem(
      "line",
      JSON.stringify({ entId: line.entId, entName: line.ent_name })
    );
    setOrder({ woId: cleaningData.wo_id, operId: cleaningData.oper_id });
    localStorage.setItem(
      "order",
      JSON.stringify({
        woId: cleaningData.wo_id,
        operId: cleaningData.oper_id,
      })
    );
    setGlobalVariables({ ...globalVariables, currentOrder });
    localStorage.setItem("currentOrder", currentOrder);
 */
  };
  return (
    <>
      <Card
        raised={raise}
        onMouseEnter={() => setRaise(true)}
        onMouseLeave={() => setRaise(false)}
      >
        <CardActionArea>
          <StyledLink to={`/limpieza-periodica`} onClick={handlePush}>
            <CardHeader component="div" title={"Limpieza Periódica"} />
          </StyledLink>
        </CardActionArea>
      </Card>
      {/* <Segment.Group
        raised
        onClick={line.ent_name !== "LIM01" ? handlePush : undefined}
        style={{ cursor: "pointer", border: "none" }}
      >
        <Segment
          className={
            cleaningData.state_cd === 3
              ? "blinking-effect-green"
              : cleaningData.state_cd === 5
              ? "blinking-effect-red"
              : ""
          }
          style={{
            marginBottom: "0 !important",
            padding: 10,
            fontSize: "1.1em",
            fontWeight: "bold",
            textAlign: "center",
          }}
          disabled={line.ent_name === "LIM01"}
        >
          <Header as="h3" style={{ display: "inline" }}>
            Limpieza Periódica
          </Header>
          {cleaningData.state_cd === 3 ? (
            <Icon
              loading
              size={"large"}
              name="spinner"
              style={{ position: "relative", float: "right", color: "#1b7942" }}
            />
          ) : cleaningData.state_cd === 5 ? (
            <Icon
              size={"large"}
              name="pause"
              style={{ position: "relative", float: "right", color: "#721717" }}
            />
          ) : (
            <></>
          )}
        </Segment>
      </Segment.Group> */}
    </>
  );
};

export default MonthlyCleaningBox;
