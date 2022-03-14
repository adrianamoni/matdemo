import React from "react";

const Productions = () => {
  const windowSize = useWindowSize();

  const productionTableColumns = [
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
      flex: 1,
    },
    {
      field: "qty_cons",
      headerName: `${Text({ tid: "reason" })}`,
      flex: 1,
    },
  ];

  return <div>Productions</div>;
};

export default Productions;
