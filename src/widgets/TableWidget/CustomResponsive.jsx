import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Pagination,
  TextField,
  Typography,
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
  edit,
}) => {
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
      if (!selectedRowsIds[tableName].includes(id)) {
        setSelectedRowsIds({
          ...selectedRowsIds,
          [tableName]: [...selectedRowsIds[tableName], id],
        });
      }
    } else {
      setSelectedRowsIds({
        ...selectedRowsIds,
        [tableName]: [id],
      });
    }
  };

  const handleEdit = ({ value, id, field }) => {
    const params = { value, id, field };
    edit(params);
  };

  return (
    <div>
      <Pagination count={totalPages} onChange={handlePagination} />
      {paginatedData &&
        paginatedData.map((data, i) => {
          const isSelected =
            selectedRowsIds[tableName] &&
            !!selectedRowsIds[tableName].find((el) => el === data.id);
          return (
            <Box
              index={i}
              sx={{
                borderBottom: "1px solid #cecece",
                padding: "5px",
                backgroundColor: isSelected ? "#7cbedd" : undefined,
                "&:hover": {
                  backgroundColor: !isSelected ? "#bcdff0" : undefined,
                },
              }}
              onClick={() => !disableSelection && handleClick(data.id)}
            >
              {columns.map((column, index) => (
                <Grid container spacing={1} index={index}>
                  <Grid item xs={5}>
                    <Typography noWrap sx={{ fontWeight: "bold" }}>
                      {column.headerName}
                    </Typography>
                  </Grid>
                  <Grid item xs={7} textAlign="right">
                    {!column.editable ? (
                      <span>{data[column.field]}</span>
                    ) : (
                      <FormControl fullWidth>
                        <TextField
                          className="custom-number-input"
                          size="small"
                          onChange={(e) =>
                            handleEdit({
                              field: column.field,
                              value: e.target.value,
                              id: data.id,
                            })
                          }
                          type={column?.type || "text"}
                        />
                      </FormControl>
                    )}
                  </Grid>
                </Grid>
              ))}
            </Box>
          );
        })}
    </div>
  );
};

export default CustomResponsive;
