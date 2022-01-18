import React from "react";
import { Typography } from "@mui/material";
import TableWidget from "../widgets/TableWidget/TableWidget";
import { dataTable } from "../widgets/TableWidget/fakedata";

const Table = () => {
  const columns = [
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
  ];
  return (
    <>
      <TableWidget data={dataTable} columns={columns} whatever="sdfsdf" />
    </>
  );
};

export default Table;
