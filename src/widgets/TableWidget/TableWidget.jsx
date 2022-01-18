import React, { useState, useEffect } from "react";

import TableContainer from "@mui/material/TableContainer";
import { Switch, TextField } from "@mui/material/";

import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
// import { dataTable } from "./fakedata";
import CustomResponsive from "./CustomResponsive";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import useWindowSize from "../../components/customHooks/UseWindowsSize";
import { searchbarFilter } from "./searchBarHelper";

const TableWidget = ({ data, columns }) => {
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
    <TableContainer component={Paper}>
      <TextField
        id="standard-basic"
        placeholder="Filtrar.."
        variant="standard"
        value={searchInput}
        onChange={(e) => setsearchInput(e.target.value)}
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
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={renderData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      ) : (
        <CustomResponsive
          rows={renderData}
          columns={columns}
          keys={["name", "username", "email", "phone", "website"]}
        />
      )}
    </TableContainer>
  );
};

export default TableWidget;
