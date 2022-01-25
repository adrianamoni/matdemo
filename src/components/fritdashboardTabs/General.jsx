import {
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  Container,
  Toolbar,
  Divider,
  ButtonGroup,
  Button,
  Drawer,
  Tabs,
  Tab,
} from "@mui/material";
import { useParams } from "react-router-dom";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React from "react";
import Text from "../../languages/Text";
import HalfDoughnut from "../../widgets/halfDoughnut/HalfDoughnut";
import Timeline from "../../widgets/timeline/Timeline";
import useWindowSize from "../customHooks/UseWindowsSize";
import LineProgress from "../../widgets/progress/LineProgress";

const General = () => {
  let { slug } = useParams();
  const { width } = useWindowSize();
  return (
    <Grid container>
      <Paper sx={{ width: "100%", marginTop: "1rem" }}>
        <Grid
          container
          item
          sx={{
            margin: 0,
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={6}>
            <Timeline />
          </Grid>
          <Grid item xs={12} md={3}>
            <HalfDoughnut value={[19]} />
          </Grid>
          <Grid item xs={12} md={3}>
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
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ width: "100%", marginTop: 2 }}>
        <Grid
          container
          item
          sx={{
            margin: 0,
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={8} sx={{ margin: 0, padding: 2 }}>
            <Typography component="h5" variant="h5">
              385156 CACAHUETE REP JUMBO SAL 6XB.1K
            </Typography>
            <Grid container item>
              <Grid item xs={12} sm={12} md={4}>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Wo</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">12234</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Estado</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">READY</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Inicio teor.</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">123</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Inicio real.</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">-</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Pers teor.</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">2</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Programa Env.</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">FS222</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Programa Pes.</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">115</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Soldadura</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">-</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Caract.Especial</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">-</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Tipo de Criba</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">-</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Cant. a fabricar</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">600 KG</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Cant. Buena</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">40 KG</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Cant. Rechazada</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">120 KG</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>NºCajas</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">12 uds</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>NºPalets</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">0 uds</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                md={12}
                lg={4}
                justifyContent={"center"}
              >
                <ButtonGroup
                  variant="contained"
                  size="small"
                  aria-label="large button group"
                >
                  <IconButton>
                    <PlayArrowIcon />
                  </IconButton>
                  <IconButton>
                    <StopIcon />
                  </IconButton>
                  <IconButton>
                    <PauseIcon />
                  </IconButton>
                </ButtonGroup>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                md={12}
                lg={8}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ p: 2 }}
              >
                <Grid item xs={3}>
                  {width < 550 ? "Prod." : Text({ tid: "production" })}
                </Grid>
                <Grid item xs={9}>
                  <LineProgress value={23} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12} md={4} sx={{ padding: 2 }}>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography align="center" variant="h6" component="h6">
                  OEE INSTANTANEO
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <HalfDoughnut value={[78]} />
              </Grid>
            </Grid>
            <Grid container align="center" item xs={12}>
              <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                  AUTO CONTROLES
                </Typography>
              </Grid>

              <Grid item xs={6}>
                Fecha último
                <br />
                auto control
              </Grid>
              <Grid item xs={6}>
                -
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ width: "100%", marginTop: 2 }}>
        <Grid
          container
          item
          sx={{ margin: 0, padding: 2, alignItems: "center" }}
        >
          <Grid item xs={12} md={8} sx={{ margin: "0px", padding: "0px" }}>
            <Typography variant="h6" component="h6" align="center">
              Limpieza y Cambio
            </Typography>
            <Grid container item sx={{ p: 1 }}>
              <Grid item xs={12} sm={12} md={4}>
                <List align="center">
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Descripción</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">Limpieza en seco</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Tiempo</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">00h 15min 00s</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ButtonGroup
                    variant="contained"
                    size="small"
                    aria-label="large button group"
                  >
                    <IconButton>
                      <PlayArrowIcon />
                    </IconButton>
                    <IconButton>
                      <StopIcon />
                    </IconButton>
                    <IconButton>
                      <PauseIcon />
                    </IconButton>
                  </ButtonGroup>
                </List>
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={4}
                alignItems="center"
                justifyContent="center"
                sx={{ p: 2 }}
              >
                <Grid item xs={6}>
                  <Typography>
                    <strong>Tiempo restante</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>2 min</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <List align="center">
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Última Limpieza</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          Limpieza con Producto
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Estado</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">Limpio</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} align="center">
            <Grid container item>
              <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                  PAROS
                </Typography>
              </Grid>

              <Grid item xs={6}>
                Paros pendientes
              </Grid>
              <Grid item xs={6}>
                2
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default General;
