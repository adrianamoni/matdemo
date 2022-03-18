import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Pagination,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paginate from "./paginate";
import {
  formContext,
  selectedRowsIdsContext,
} from "../../context/ContextProvider";
import InputWidget from "../forms/InputWidget";

const CustomResponsive = ({
  keys,
  rows,
  columns,
  tableName,
  disableSelection,
  multipleSelection,
  editModel,
}) => {
  console.log("columns", columns);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { formWidget, setformWidget } = useContext(formContext);
  const [paginatedData, setPaginatedData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    //paginate Data
    const paginated = Paginate(rows, currentPage, pageSize);
    setPaginatedData(paginated);
  }, [keys, currentPage, rows]);

  useEffect(() => {
    if (paginatedData && paginatedData.length > 1) {
      const numberOfPages = Math.ceil(rows.length / pageSize);
      setTotalPages(numberOfPages);
    } else {
      setTotalPages(1);
    }
  }, [paginatedData]);

  const handlePagination = (e, v) => {
    setCurrentPage(v);
  };

  const handleClick = (id) => {
    if (multipleSelection && selectedRowsIds && selectedRowsIds[tableName]) {
      setSelectedRowsIds({
        ...selectedRowsIds,
        [tableName]: [...selectedRowsIds[tableName], id],
      });
    } else {
      setSelectedRowsIds({
        ...selectedRowsIds,
        [tableName]: [id],
      });
    }
  };

  const handleEdit = (e) => {
    console.log("e.target.value", e.target.value);
    /*      setformWidget({ ...formWidget, materials: model }); */
  };

  return (
    <div>
      <Pagination count={totalPages} onChange={handlePagination} />
      {paginatedData &&
        paginatedData.map((data, i) => (
          <Box
            index={i}
            sx={{
              borderBottom: "1px solid #cecece",
              padding: "5px",
              backgroundColor:
                selectedRowsIds[tableName] &&
                !!selectedRowsIds[tableName].find((el) => el === data.id) &&
                "#7cbedd",
              "&:hover": { backgroundColor: "#bcdff0" },
            }}
            onClick={() => !disableSelection && handleClick(data.id)}
          >
            {columns.map((column, index) => (
              <Grid container spacing={2} index={index}>
                <Grid item xs={4}>
                  <span className="customResponsiveTable">
                    {column.headerName}
                  </span>
                </Grid>
                <Grid item xs={8}>
                  {!column.editable ? (
                    <span>{data[column.field]}</span>
                  ) : (
                    <FormControl fullWidth>
                      <TextField
                        onChange={handleEdit}
                        type={column?.type || "text"}
                      />
                    </FormControl>
                  )}
                </Grid>
              </Grid>
            ))}
          </Box>
        ))}
    </div>
  );
};

export default CustomResponsive;
