import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Typography, Box, IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
const Item = styled(Paper)({
  /* , */
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  //backgroundColor: "rgba(220,220,220,0.8)",
});

const Dashboard = () => {
  const [activePage, setActivePage] = useState(1);

  return (
    <div>
      <Grid
        container
        spacing={5}
        justifyContent={"center"}
        sx={{ height: "calc(100vh - 70px)" }}
      >
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Item>
              <Grid container spacing={3}>
                
                <Grid
                  item
                  xs={12}
                  sx={{
                    backgroundColor: "#dedede",
                    mb: 2,
                    ml: 3,
                    height: "auto",
                  }}
                >
                  item
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    backgroundColor: "#dedede",
                    mb: 2,
                    ml: 3,
                    height: "auto",
                  }}
                >
                  item
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    backgroundColor: "#dedede",
                    mb: 2,
                    ml: 3,
                    height: "auto",
                  }}
                >
                  item
                </Grid>
           
              </Grid>
            </Item>
          </Grid>
        ))}

        <Box
          sx={{
            position: "absolute",
            bottom: "1em",
            right: "1em",
          }}
        >
          <IconButton
            color="primary"
            aria-label="paginate"
            sx={{ fontSize: "4em" }}
          >
            <ArrowCircleRightIcon sx={{ fontSize: "1em" }} />
          </IconButton>
        </Box>
      </Grid>
    </div>
  );
};

export default Dashboard;
