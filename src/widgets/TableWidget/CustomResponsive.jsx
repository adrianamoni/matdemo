import React, { useState, useEffect } from "react";
import { Box, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paginate from "./paginate";

const CustomResponsive = ({ keys, rows, columns }) => {
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

  /* onSelectionModelChange={(newSelectionModel) => {
                setSelectedRowsIds({
                  ...selectedRowsIds,
                  [tableName]: newSelectionModel,
                });
              }}
              selectionModel={selectedRowsIds[tableName]} */

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
            }}
          >
            {columns.map((column, index) => (
              <Grid container spacing={2} index={index}>
                <Grid item xs={4}>
                  <span className="customResponsiveTable">
                    {column.headerName}
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <span>{data[column.field]}</span>
                </Grid>
              </Grid>
            ))}
          </Box>
        ))}
    </div>
  );
};

export default CustomResponsive;
