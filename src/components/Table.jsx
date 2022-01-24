import React from "react";
import { Typography } from "@mui/material";
import TableWidget from "../widgets/TableWidget/TableWidget";
import { dataTable } from "../widgets/TableWidget/fakedata";
import Text from "./../languages/Text";

const Table = () => {
  const columns = [
    { field: "id", headerName: `${Text({ tid: "id" })}`, width: 70 },
    { field: "name", headerName: `${Text({ tid: "name" })}`, width: 130 },
    { field: "username", headerName: `${Text({ tid: "user" })}`, flex: 1 },
    {
      field: "email",
      headerName: `${Text({ tid: "email" })}`,
      flex: 1,
    },
    {
      field: "phone",
      headerName: `${Text({ tid: "phone" })}`,
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
