import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paginate from "./paginate";
import { selectedRowsIdsContext } from "../../context/ContextProvider";

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

  const handleClick = ({ dataId, e }) => {
    if (!e.target.type) {
      if (multipleSelection && selectedRowsIds && selectedRowsIds[tableName]) {
        if (!selectedRowsIds[tableName].includes(dataId)) {
          setSelectedRowsIds({
            ...selectedRowsIds,
            [tableName]: [...selectedRowsIds[tableName], dataId],
          });
        } else {
          setSelectedRowsIds({
            ...selectedRowsIds,
            [tableName]: selectedRowsIds[tableName].filter(
              (el) => el !== dataId
            ),
          });
        }
      } else {
        setSelectedRowsIds({
          ...selectedRowsIds,
          [tableName]: [dataId],
        });
      }
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
              key={i}
              index={i}
              sx={{
                borderBottom: "1px solid",
                borderColor: "#aaa",
                padding: "5px",
                backgroundColor: isSelected ? "selected.main" : undefined,
                "&:hover": {
                  backgroundColor: !isSelected ? "hover.main" : undefined,
                },
                wordWrap: "break-word",
              }}
              onClick={(e) =>
                !disableSelection && handleClick({ dataId: data.id, e })
              }
            >
              {columns.map((column, index) => (
                <Grid container spacing={1} index={index} key={index}>
                  <Grid item xs={5}>
                    <Typography
                      noWrap
                      variant="body2"
                      sx={{ fontWeight: "bold" }}
                    >
                      {column.headerName}
                    </Typography>
                  </Grid>
                  <Grid item xs={7} textAlign="right">
                    {!column.editable ? (
                      <Typography variant="body3">
                        {data[column.field]}
                      </Typography>
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
