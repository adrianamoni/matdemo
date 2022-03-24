import {
  Alert,
  Container,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Text from "../../../languages/Text";
import TableWidget from "../../../widgets/TableWidget/TableWidget";
/* import { TabPanel } from "@mui/lab"; */

function TabPanel(props) {
  const { children, value, index } = props;

  return value === index ? <>{children}</> : <></>;
}
const ConsAndProds = ({
  loading,
  consumptionData,
  selectedRows,
  productionData,
}) => {
  const [value, setValue] = useState(0);
  const consColumns = [
    {
      field: "material",
      headerName: `${Text({ tid: "material" })}`,
      flex: 1,
    },
    {
      field: "lot_no",
      headerName: `${Text({ tid: "lot" })}`,
      flex: 1,
    },
    {
      field: "qty_cons",
      headerName: `${Text({ tid: "quantity" })}`,
      type: "number",
      flex: 1,
    },
  ];

  const prodColumns = [
    {
      field: "material",
      headerName: `${Text({ tid: "material" })}`,
      flex: 1,
    },
    {
      field: "lot_no",
      headerName: `${Text({ tid: "lot" })}`,
      flex: 1,
    },
    {
      field: "qty_prod",
      headerName: `${Text({ tid: "quantity" })}`,
      flex: 1,
      type: "number",
    },
    {
      field: "reas_desc",
      headerName: `${Text({ tid: "reason" })}`,
      flex: 1,
    },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {loading && (
            <LinearProgress variant="indeterminate" color="secondary" />
          )}
        </Grid>
        {selectedRows && selectedRows.length > 0 && (
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              sx={{ backgroundColor: "background.grey3" }}
            >
              <Tab
                label="Consumos"
                icon={<FileUploadIcon />}
                iconPosition="start"
              />
              <Tab
                label="Producciones"
                icon={<FileDownloadIcon />}
                iconPosition="start"
              />
            </Tabs>
          </Grid>
        )}
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <Grid container>
              {consumptionData ? (
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12}>
                      <TableWidget
                        data={consumptionData}
                        columns={consColumns}
                        tableName="cons-order-management"
                        disableSelection={true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                selectedRows.length > 0 && (
                  <Grid item xs={12}>
                    <Alert variant="filled" severity="info">
                      {Text({ tid: "noConsumptionsInThisOrder" })}
                    </Alert>
                  </Grid>
                )
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container>
              {productionData ? (
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12}>
                      <TableWidget
                        data={productionData}
                        columns={prodColumns}
                        tableName="prod-order-management"
                        disableSelection={true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                !loading &&
                selectedRows.length > 0 && (
                  <Grid item xs={12}>
                    <Alert variant="filled" severity="info">
                      {Text({ tid: "noProductionsInThisOrder" })}
                    </Alert>
                  </Grid>
                )
              )}
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default ConsAndProds;
/*  */
