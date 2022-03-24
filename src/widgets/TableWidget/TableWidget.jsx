import React, { useState, useEffect, useContext, useCallback } from "react";

import TableContainer from "@mui/material/TableContainer";
import { Switch, TextField } from "@mui/material/";

import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
// import { dataTable } from "./fakedata";
import CustomResponsive from "./CustomResponsive";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import useWindowSize from "../../components/customHooks/UseWindowsSize";
import { searchbarFilter } from "./searchBarHelper";
import Text from "./../../languages/Text";
import { selectedRowsIdsContext } from "../../context/ContextProvider";
import { darken, lighten } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const TableWidget = ({
  data,
  setData,
  columns,
  multipleSelection,
  tableName,
  pagination = 5,
  disableSelection = false,
}) => {
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );

  const [rowsColors, setRowsColors] = useState(false);
  const [checked, setChecked] = useState(false);
  const [pageDimentions, setPageDimentions] = useState(undefined);
  //searchbar
  const [searchInput, setsearchInput] = useState("");
  const [renderData, setrenderData] = useState(undefined);

  /**
   * columns example
   */
  /* const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 130 },
    { field: "username", headerName: "Usuario", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Teléfono",
      type: "number",
      flex: 1,
    },
  ]; */

  //Rows colors
  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  const getHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

  useEffect(() => {
    if (data.length > 0) {
      let bgColorsArr = data.map((el) => {
        if (el?.color) {
          let key = "& .super-app-theme--" + el.color;
          return {
            [key]: {
              bgcolor: (theme) =>
                getBackgroundColor("#" + el.color, theme.palette.mode),
              "&:hover": {
                bgcolor: (theme) =>
                  getHoverBackgroundColor("#" + el.color, theme.palette.mode),
              },
            },
          };
        }
      });
      const rowsColorsObj = Object.assign({}, ...bgColorsArr);
      // const rowsColorsObj = Object.assign(
      //   // {
      //   //   boxShadow: 1,
      //   //   border: 3,
      //   //   borderColor: "#00000042",
      //   // },
      //   ...bgColorsArr
      // );
      setRowsColors(rowsColorsObj);
    }
    // else {
    //    const rowsColorsObj = Object.assign({
    //      boxShadow: 1,
    //      border: 3,
    //      borderColor: "#00000042",
    //    });
    //    setRowsColors(rowsColorsObj);
    // }
  }, [data]);

  const customHeaderStyle = {
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "background.grey3",
      boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.2)",
      borderRadius: "none",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 700,
    },
    ".MuiDataGrid-cell": {
      whiteSpace: "normal",
      padding: "0px 5px",
    },
  };
  const customCellStyle = {
    "& .MuiDataGrid-cell": {
      //fontSize: "0.8em",
      fontSize: {
        xs: "0.8em",
        sm: "0.8em",
        md: "0.85em",
        lg: "0.9em",
        xl: "1.05em",
      },
    },
    "& .MuiDataGrid-row.Mui-selected": {
      backgroundColor: "selected.main", //"#7cbedd",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "hover.main", //"#bcdff0",
    },
  };

  const size = useWindowSize();

  //useEffect for hiding the switch on table layout
  useEffect(() => {
    setPageDimentions(size);
    if (size.width > 900) {
      // CHANGES FOR ADVANCED FACTORIES
      setChecked(true); //false
    } else {
      setChecked(false);
    }
  }, [size]);

  //useEffect for filtering data
  useEffect(() => {
    if (searchInput && searchInput.length > 0) {
      setrenderData(searchbarFilter(data, searchInput));
    } else {
      setrenderData(data);
    }
  }, [searchInput, data]);

  const handleCellEditCommit = (params, event, details) => {
    let temp = data.map((el) => {
      if (el.id === params.id) {
        el.CantidadAprov = params.value;
      }
      return el;
    });
    setData(temp);
  };

  return (
    <TableContainer
      sx={{
        backgroundColor: "background.grey4",
        p: 1,
      }}
    >
      <TextField
        id="standard-basic"
        placeholder={Text({ tid: "filter" })}
        variant="standard"
        value={searchInput}
        onChange={(e) => setsearchInput(e.target.value)}
      />
      {/* //CHANGES FOR ADVANCED FACTORIES */}
      {/* {pageDimentions && pageDimentions.width < 800 && (
        <div style={{ display: "flex" }}>
          <div>
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          </div>

          <div
            style={{
              display: "flex",
              paddingTop: "5px",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            <ListOutlinedIcon />
          </div>
        </div>
      )} */}
      {checked ? (
        multipleSelection ? (
          <div
            style={{
              /* height: pagination ? pagination * 65 : 400, */
              width: "100%",
            }}
          >
            <DataGrid
              sx={{ ...customHeaderStyle, ...customCellStyle, rowsColors }}
              rows={renderData}
              columns={columns}
              autoHeight
              pageSize={pagination || 10}
              rowsPerPageOptions={[pagination || 10]}
              checkboxSelection
              onSelectionModelChange={(newSelectionModel) => {
                setSelectedRowsIds({
                  ...selectedRowsIds,
                  [tableName]: newSelectionModel,
                });
              }}
              selectionModel={selectedRowsIds[tableName]}
              /* getRowClassName={(params) =>
                `super-app-theme--${params.row.color}`
              } */
              onCellEditCommit={handleCellEditCommit}
            />
          </div>
        ) : (
          <div
            style={{
              /*  height: pagination ? pagination * 65 : 400, */
              width: "100%",
            }}
          >
            <DataGrid
              sx={{ ...customHeaderStyle, ...customCellStyle, rowsColors }}
              rows={renderData}
              columns={columns}
              autoHeight
              pageSize={pagination || 10}
              rowsPerPageOptions={[pagination || 10]}
              onSelectionModelChange={(newSelectionModel) => {
                !disableSelection &&
                  setSelectedRowsIds({
                    ...selectedRowsIds,
                    [tableName]: newSelectionModel,
                  });
              }}
              selectionModel={!disableSelection && selectedRowsIds[tableName]}
              /* getRowClassName={(params) =>
                `super-app-theme--${params.row.color}`
              } */
            />
          </div>
        )
      ) : (
        <CustomResponsive
          rows={renderData}
          columns={columns}
          tableName={tableName}
          disableSelection={disableSelection}
          multipleSelection={multipleSelection}
          edit={handleCellEditCommit}
          /*      editModel={handleEditRowsModelChange} */
        />
      )}
    </TableContainer>
  );
};

export default TableWidget;
