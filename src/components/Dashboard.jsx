import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  Fragment,
} from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  IconButton,
  Container,
  CircularProgress,
  Button,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import HalfDoughnut from "../widgets/halfDoughnut/HalfDoughnut";
import { blue, green, orange, red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import Text from "./../languages/Text";
import { MemoryDatabaseCall } from "../services/Service";
import {
  entities_by_terminal,
  read_tags_teams,
} from "../services/serviceHelper";
import { globalDataContext } from "../context/ContextProvider";
import Line from "./fritdashboardComps/Line";
import { oee_targets, read_specs } from "../services/OFservices";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CustomStepper from "../widgets/CustomStepper/CustomStepper";
import General from "./fritdashboardTabs/General/General";
/* const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
})); */

const Dashboard = () => {
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;
  const { globalData, setGlobalData } = useContext(globalDataContext);
  const [loading, setLoading] = useState(false);
  const [preLines, setPreLines] = useState(undefined);
  const [lines, setLines] = useState(undefined);
  const [pagination, setPagination] = useState({
    min: 1,
    max: undefined,
  });
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetchLines();
    fetchSpecs();
    return () => {
      /*     setLines(undefined); */
      setPagination({
        min: 1,
        max: undefined,
      });
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (preLines) {
      fetchOeeTarget();
    }
    //eslint-disable-next-line
  }, [preLines]);

  const fetchLines = async () => {
    setLoading(true);
    const response = await MemoryDatabaseCall({
      params: entities_by_terminal({
        name: "terminal",
        dataType: "String",
        value: 1, //!UNDO
      }),
      url: "queryDataAsync",
    });
    if (response) {
      if (response.length > 0) {
        setPreLines(response);
        setPagination((pagination) => {
          return { ...pagination, max: Math.ceil(response.length / 3) };
        });
      }
    }
    setLoading(false);
  };

  const fetchSpecs = async () => {
    const response = await MemoryDatabaseCall({
      params: read_specs(),
      url: "queryDataFrameDataAsync",
    });
    if (response) {
      if (response.responseError) {
      } else {
        const findAmarillo = response.find(
          (el) => el.spec_id === "%amarilloOEE"
        );
        if (findAmarillo) {
          setGlobalData({
            ...globalData,
            oeeSpecs: {
              ...globalData.oeeSpecs,
              yellowThreshold: parseFloat(findAmarillo.units),
            },
          });
          localStorage.setItem(
            `OeeSpecs_${PROJECT_NAME}`,
            JSON.stringify({ yellowThreshold: parseFloat(findAmarillo.units) })
          );
        }
      }
    }
  };
  const fetchOeeTarget = async () => {
    const filter = null;
    const response = await MemoryDatabaseCall({
      params: oee_targets({ filter }),
      url: "queryDataFrameDataAsync",
    });
    if (response) {
      if (response.responseError) {
      } else {
        if (response.length > 0) {
          const res = preLines.map((el) => ({
            ...el,
            oeeTarget:
              response.find((it) => it.ent_name === el.ent_name)?.target_oee ||
              undefined,
          }));
          setLines(res);
        }
      }
    }
  };
  /* loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : */
  return lines && lines.length > 0 ? (
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <IconButton
                color="info"
                size="large"
                aria-label="upload picture"
                component="span"
                disabled={activePage === pagination.min}
                onClick={() =>
                  activePage > 1
                    ? setActivePage(activePage - 1)
                    : setActivePage(1)
                }
              >
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="large"
                color="info"
                aria-label="upload picture"
                component="span"
                disabled={activePage === pagination.max}
                onClick={() =>
                  activePage < pagination.max
                    ? setActivePage(activePage + 1)
                    : setActivePage(pagination.max)
                }
              >
                <ChevronRightIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            {lines
              .slice((activePage - 1) * 3, activePage * 3)
              .map((line, i) => (
                <Fragment key={i}>
                  <Line key={line.entId} line={line} />
                </Fragment>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  ) : (
    <></>
  );
};

export default Dashboard;
