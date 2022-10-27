import { Grid, List, ListItem, Typography } from "@mui/material";
import React from "react";
import Text from "../../../../languages/Text";
import LineProgress from "../../../../widgets/progress/LineProgress";

const TTorder = ({
  processedData,
  productionData,
  background,
  width,
  energyData,
}) => {
  return (
    <Grid item xs={12}>
      <List>
        <Grid container>
          {processedData &&
            processedData.map((item, index) => (
              <Grid key={index} item xs={12} sm={12} md={12} lg={12} xl={6}>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>
                          {Object.keys(item).length > 0 ? (
                            Text({ tid: Object.keys(item) })
                          ) : (
                            <></>
                          )}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right" sx={{ fontSize: "1.1rem" }}>
                        <span
                          style={
                            item.hasOwnProperty("state")
                              ? {
                                  paddingInline: "0.8em",
                                  paddingBlock: "0.15em",
                                  backgroundColor: background,
                                  color: "#111",
                                }
                              : {}
                          }
                        >
                          {Object.values(item)}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </Grid>
            ))}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={6} alignItems="center">
            <ListItem>
              <Grid container sx={{ alignItems: "center" }}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>
                      {width < 550 ? "Prod." : Text({ tid: "production" })}
                    </strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <LineProgress
                    value={Math.round(
                      (productionData.qty_prod / productionData.qty_reqd) * 100
                    )}
                  />
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          {/* energia */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>
                    <strong>
                      <Text tid={"consumoTotal"} />
                    </strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" sx={{ fontSize: "1.1rem" }}>
                    <span>{`${energyData?.consumo} kw`}</span>
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>
                    <strong>
                      <Text tid={"consumoUd"} />
                    </strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" sx={{ fontSize: "1.1rem" }}>
                    <span>
                      {" "}
                      {productionData.qty_prod + productionData.qty_rejected > 0
                        ? `${(
                            energyData?.consumo / productionData.qty_prod +
                            productionData.qty_rejected
                          ).toFixed(2)} kw`
                        : "-"}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          {/* fin energia */}
        </Grid>
      </List>
    </Grid>
  );
};

export default TTorder;
