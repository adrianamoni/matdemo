import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { globalDataContext } from "../../../context/ContextProvider";
import { MemoryDatabaseCall } from "../../../services/Service";
import { get_documentation_data } from "../../../services/OFservices";
import {
  Box,
  LinearProgress,
  Grid,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import UserAlert from "./../../alerts/UserAlert";
import { createNotification } from "./../../alerts/NotificationAlert";
import Text from "./../../../languages/Text";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#e0e1e2",
    },
  },
});

const IframeComp = ({ url }) => {
  return (
    <iframe
      title="docs-pdf-frame"
      wmode="opaque"
      src={url}
      frameborder="0"
      style={{
        minHeight: 600,
        height: "calc(100vh - 240px)",
        width: "100%",
        border: 0,
      }}
    ></iframe>
  );
};

const Documentation = () => {
  const DEVELOPMENT_IP = "192.168.9.128";
  const PRODUCTION_IP = "192.168.9.128";
  const production_uri = `http://${PRODUCTION_IP}/documentacion/`;
  const development_uri = `http://${DEVELOPMENT_IP}/documentacion/`;

  //useContext
  const { globalData } = useContext(globalDataContext);
  const { entName } = globalData.lineData;
  //useState
  const [tableData, setTableData] = useState(false);
  const [displayPdfViewer, setDisplayPdfViewer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAlert, setUserAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    fetchData(true);

    return () => {
      setTableData([]);
    };
  }, []);

  const fetchData = async (showLoader) => {
    showLoader && setLoading(true);

    const filters = [
      {
        filterExpression: null,
        filterItem: {
          column: "Equipo",
          dataType: "String",
          value: entName,
          filterItemType: "Equal",
          checkDBNull: false,
        },
      },
      {
        filterExpression: null,
        filterItem: {
          column: "Equipo",
          dataType: "String",
          value: "TODOS",
          filterItemType: "Equal",
          checkDBNull: false,
        },
      },
      {
        filterExpression: null,
        filterItem: {
          column: "Equipo",
          dataType: "String",
          value: "TODAS",
          filterItemType: "Equal",
          checkDBNull: false,
        },
      },
    ];

    const response = await MemoryDatabaseCall({
      params: get_documentation_data(filters),
      url: "queryDataFrameDataAsync",
    });
    if (response) {
      if (response.responseError) {
        createNotification({
          status: "error",
          msg: response.responseError,
          hide: 1,
        });
      } else {
        setTableData(response);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    tableData && tableData.length < 1
      ? setUserAlert({
          show: true,
          message: Text({ tid: "noDocumentationAvailable" }),
          severity: "info",
        })
      : setUserAlert({
          show: false,
          message: "",
          severity: "",
        });
  }, [tableData]);

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      {tableData?.length > 0 ? (
        <>
          <Grid container xs={12} sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12} xl={4}>
              <Typography variant="h6" component="h6">
                <Text tid={"files"} />
              </Typography>
              <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
              {tableData.map((el) => (
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ margin: "10px" }}
                >
                  <ThemeProvider theme={theme}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12} lg={12} xl={8}>
                        <Button
                          variant="contained"
                          color="neutral"
                          onClick={() =>
                            setDisplayPdfViewer({
                              name: el.NombreFichero,
                              url: `${
                                process.env.NODE_ENV === "production"
                                  ? production_uri
                                  : development_uri
                              }${el.NombreFichero}#navpanes=0`,
                            })
                          }
                          sx={{ marginBottom: "10px", padding: "10px" }}
                        >
                          {el.Descripcion}
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={6} lg={6} xl={2}>
                        <Button
                          variant="contained"
                          onClick={() =>
                            setDisplayPdfViewer({
                              name: el.NombreFichero,
                              url: `${
                                process.env.NODE_ENV === "production"
                                  ? production_uri
                                  : development_uri
                              }${el.NombreFichero}#navpanes=0`,
                            })
                          }
                          color="neutral"
                        >
                          <FileOpenIcon color="primary" />
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={6} lg={6} xl={2}>
                        <Button
                          variant="contained"
                          href={`${
                            process.env.NODE_ENV === "production"
                              ? production_uri
                              : development_uri
                          }${el.NombreFichero}`}
                          target="_blank"
                          color="neutral"
                        >
                          <ScreenShareIcon color="action" />
                        </Button>
                      </Grid>
                    </Grid>
                  </ThemeProvider>
                </Stack>
              ))}
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={8}>
              <IframeComp url={displayPdfViewer.url} />
            </Grid>
          </Grid>
        </>
      ) : (
        userAlert.show && (
          <UserAlert
            severity={userAlert.severity}
            message={userAlert.message}
          />
        )
      )}
    </>
  );
};

export default Documentation;
