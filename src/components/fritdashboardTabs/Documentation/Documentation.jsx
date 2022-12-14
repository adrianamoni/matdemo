import React, { useContext, useState, useEffect } from "react";
import { globalDataContext } from "../../../context/ContextProvider";
import { MemoryDatabaseCall } from "../../../services/Service";
import { get_documentation_data } from "../../../services/OFservices";
import {
  Box,
  LinearProgress,
  Grid,
  Typography,
  Stack,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import UserAlert from "./../../alerts/UserAlert";
import { createNotification } from "./../../alerts/NotificationAlert";
import Text from "./../../../languages/Text";

const IframeComp = ({ url }) => {
  return (
    <iframe
      title="docs-pdf-frame"
      wmode="opaque"
      src={`http://${url}`}
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
  const docUri = POINTING_IPS.documentacion;
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
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={12} lg={12} xl={5}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h6">
                <Text tid={"files"} />
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                maxHeight: "calc(100vh - 240px)",
                overflowY: "auto",
                backgroundColor: "background.grey3",
                p: 1,
              }}
            >
              {tableData
                ? tableData.map((el, i, arr) => (
                    <>
                      <Grid container>
                        <Grid item xs={12} md={8}>
                          <Button
                            onClick={() =>
                              setDisplayPdfViewer({
                                name: el.NombreFichero,
                                url: `${docUri}/documentacion/${el.NombreFichero}#navpanes=0`,
                              })
                            }
                          >
                            <Typography variant="body" color="text.main">
                              {el.Descripcion}
                            </Typography>
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Button
                                fullWidth
                                variant={"contained"}
                                color="info"
                                onClick={() =>
                                  setDisplayPdfViewer({
                                    name: el.NombreFichero,
                                    url: `${docUri}/documentacion/${el.NombreFichero}#navpanes=0`,
                                  })
                                }
                              >
                                <FileOpenIcon /* color="info" */ />
                              </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Button
                                fullWidth
                                variant={"contained"}
                                color="primary"
                                href={`${docUri}/documentacion/${el.NombreFichero}`}
                                target="_blank"
                              >
                                <ScreenShareIcon /* color="primary" */ />
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                        {i + 1 !== arr.length && (
                          <Grid item xs={12} sx={{ marginBlock: 1 }}>
                            <Divider />
                          </Grid>
                        )}
                      </Grid>
                    </>
                  ))
                : userAlert.show && (
                    <UserAlert
                      severity={userAlert.severity}
                      message={userAlert.message}
                    />
                  )}
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          xl={7}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {displayPdfViewer && <IframeComp url={displayPdfViewer.url} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Documentation;
