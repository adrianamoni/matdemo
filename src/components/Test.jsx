import { Container, List, ListItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  blue,
  brown,
  green,
  grey,
  orange,
  purple,
  red,
  yellow,
} from "@mui/material/colors";
import { styled } from "@mui/system";
import { shadows } from "@mui/system";
import { Label } from "@mui/icons-material";
import Timeline from "../widgets/timeline/Timeline";
import HalfDoughnut from "../widgets/halfDoughnut/HalfDoughnut";
import Text from "../languages/Text";
const GridItem = styled(Grid)({
  borderRadius: 5,
  padding: 5,
});

const CustomItem = styled(Box)({
  padding: 10,

  borderRadius: 5,
  backgroundColor: grey[200],
  //boxShadow: "5px 5px 4px 5px rgba(100,100,100,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  /*  boxShadow: 3,
  width: '8rem',
  height: '5rem',
  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'rgba(255,255,255,0.6)'),
  color: (theme) =>
    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
  p: 1,
  m: 1,
  borderRadius: 2,
  textAlign: 'center',
  fontSize: '0.875rem',
  fontWeight: '700', */
});

const ChildItem = styled(Grid)({
  backgroundColor: grey[100],
  borderRadius: 10,
  border: "1px solid #ccc",
});

const Test = () => {
  return (
    <div className="App">
      <Container
        sx={{
          //backgroundColor: blue[200],
          padding: 2,
        }}
      >
        <Typography variant="h6" component="h2" mb>
          GRID SCHEMA 1
        </Typography>

        <Grid container>
          <GridItem item xs={12}>
            <CustomItem>OEE HISTÓRICO</CustomItem>
          </GridItem>

          <GridItem item xs={12} md={8}>
            <CustomItem sx={{ height: "100%" }}>INFO OE</CustomItem>
          </GridItem>
          <Grid item xs={12} md={4}>
            <GridItem xs={12}>
              <CustomItem>OEE INSTANTÁNEO</CustomItem>
            </GridItem>
            <GridItem xs={12}>
              <CustomItem>AUTO CONTROLES</CustomItem>
            </GridItem>
          </Grid>
          <GridItem item xs={12} md={8}>
            <CustomItem>LIMPIEZA</CustomItem>
          </GridItem>
          <GridItem item xs={12} md={4}>
            <CustomItem>PAROS</CustomItem>
          </GridItem>
        </Grid>
      </Container>
      <Container
        sx={{
          //backgroundColor: green[200],
          padding: 2,
        }}
      >
        <Typography variant="h6" component="h2" mb>
          GRID SCHEMA 2
        </Typography>

        <Grid container>
          <GridItem item xs={12}>
            <CustomItem>
              <Grid container alignItems={"center"} sx={{ width: "100%" }}>
                <CustomItem item xs={12} lg={7}>
                  <ChildItem>
                    <Timeline height={150} />
                  </ChildItem>
                </CustomItem>
                <CustomItem item xs={12} lg={3}>
                  <ChildItem>
                    <HalfDoughnut value={[42]} />
                  </ChildItem>
                </CustomItem>
                <CustomItem item xs={12} lg={2}>
                  <ChildItem>
                    <List>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography>
                              <strong>{Text({ tid: "availability" })}</strong>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">12%</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography>
                              <strong>{Text({ tid: "performance" })}</strong>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">12%</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography>
                              <strong>{Text({ tid: "quality" })}</strong>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">12%</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </ChildItem>
                </CustomItem>
              </Grid>
            </CustomItem>
          </GridItem>

          <GridItem item xs={12} md={8}>
            <CustomItem sx={{ height: "100%" }}>
              <Grid container alignItems={"center"}>
                <ChildItem item xs={12}>
                  <List>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <ListItem>
                          <Grid item xs={6}>
                            aa
                          </Grid>
                          <Grid item xs={6}>
                            ab
                          </Grid>
                        </ListItem>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        b
                      </Grid>
                      <Grid item xs={12} md={4}>
                        c
                      </Grid>
                    </Grid>
                  </List>
                </ChildItem>
                <GridItem item xs={12} md={4}>
                  BUTTONS
                </GridItem>
                <GridItem item xs={12} md={8}>
                  PRODUCTION PROGRESS
                </GridItem>
              </Grid>
            </CustomItem>
          </GridItem>
          <Grid item xs={12} md={4}>
            <GridItem xs={12}>
              <CustomItem>OEE INSTANTÁNEO</CustomItem>
            </GridItem>
            <GridItem xs={12}>
              <CustomItem>AUTO CONTROLES</CustomItem>
            </GridItem>
          </Grid>
          <GridItem item xs={12} md={8}>
            <CustomItem>LIMPIEZA</CustomItem>
          </GridItem>
          <GridItem item xs={12} md={4}>
            <CustomItem>PAROS</CustomItem>
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
};
export default Test;
