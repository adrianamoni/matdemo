import React, { useState } from "react";
import { styled } from "@mui/material/styles";
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
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import HalfDoughnut from "../widgets/halfDoughnut/HalfDoughnut";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import Timeline from "../widgets/timeline/Timeline";
import Text from "./../languages/Text";

const FritDashboard = () => {
  return (
    <Container>
      <Toolbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Paper sx={{ width: "100%", marginTop: "1rem" }}>
            <Grid
              container
              item
              spacing={1}
              sx={{
                margin: 1,
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
          <Paper sx={{ width: "100%", marginTop: "1rem" }}>
            <Grid
              container
              item
              spacing={1}
              sx={{
                margin: 1,
                alignItems: "center",
              }}
            >
              <Grid item xs={12} md={8} sx={{ margin: "0px", padding: "0px" }}>
                <Typography component="h5" variant="h5">
                  385156 CACAHUETE REP JUMBO SAL 6XB.1K
                </Typography>
                <Grid container item spacing={1}>
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
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <Grid container>
                  <Grid container item>
                    <Grid item xs={12}>
                      <Typography align="center">OEE INSTANTANEO</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <HalfDoughnut value={[78]} />
                    </Grid>
                  </Grid>
                  <Grid container item align="center">
                    <Grid item xs={12}>
                      <Typography>AUTO CONTROLES</Typography>
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
            </Grid>
          </Paper>
          <Paper sx={{ width: "100%", marginTop: "1rem" }}>
            <Grid
              container
              item
              spacing={1}
              sx={{
                margin: 1,
                alignItems: "center",
              }}
            >
              <Grid item xs={12} md={8} sx={{ margin: "0px", padding: "0px" }}>
                <Typography component="h5" variant="h5" align="center">
                  Limpieza y Cambio
                </Typography>
                <Grid container item spacing={1}>
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
                            <Typography align="right">
                              Limpieza en seco
                            </Typography>
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
                  <Grid container item xs={12} sm={12} md={4} align="center">
                    <Grid item xs={6}>
                      <Typography>Tiempo restante</Typography>
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
              <Grid item xs={12} md={4}>
                <Grid container item align="center">
                  <Grid item xs={12}>
                    <Typography align="center">AUTO CONTROLES</Typography>
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
      </Box>
    </Container>
  );
};

export default FritDashboard;
