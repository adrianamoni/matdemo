import React, { useState, useEffect, useContext } from "react";

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

const TableWidget = ({ data, columns, multipleSelection, tableName }) => {
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

  const size = useWindowSize();

  //useEffect for hiding the switch on table layout
  useEffect(() => {
    setPageDimentions(size);
    if (size.width > 800) {
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

  return (
    <TableContainer
      sx={{
        border: "solid 1px",
        borderColor: "background.paper",
      }}
    >
      <TextField
        id="standard-basic"
        placeholder={Text({ tid: "filter" })}
        variant="standard"
        value={searchInput}
        onChange={(e) => setsearchInput(e.target.value)}
        sx={{ p: 1 }}
      />

      {pageDimentions && pageDimentions.width < 800 && (
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
      )}
      {!checked ? (
        multipleSelection ? (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              sx={rowsColors}
              rows={renderData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(newSelectionModel) => {
                setSelectedRowsIds({
                  ...selectedRowsIds,
                  [tableName]: newSelectionModel,
                });
              }}
              selectionModel={selectedRowsIds[tableName]}
              getRowClassName={(params) =>
                `super-app-theme--${params.row.color}`
              }
              /*  onCellEditCommit */
            />
          </div>
        ) : (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              sx={rowsColors}
              rows={renderData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectedRowsIds({
                  ...selectedRowsIds,
                  [tableName]: newSelectionModel,
                });
              }}
              selectionModel={selectedRowsIds[tableName]}
              getRowClassName={(params) =>
                `super-app-theme--${params.row.color}`
              }
            />
          </div>
        )
      ) : (
        <CustomResponsive rows={renderData} columns={columns} />
      )}
    </TableContainer>
  );
};

export default TableWidget;
