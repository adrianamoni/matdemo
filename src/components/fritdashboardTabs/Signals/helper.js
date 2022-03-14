import _ from "lodash";

export const processData = (data, entName) => {
  data = [
    {
      Tagname: "L001.METROS_DINT",
      Quality: 192,
      Timestamp: "2022-03-14T00:04:57.668+01:00",
      DataType: "MxDouble",
      Value: 17.152099609375,
      Exception: null,
    },
    {
      Tagname: "L001.METROS_DINT.Description",
      Quality: 192,
      Timestamp: "2022-01-19T16:26:41.268+01:00",
      DataType: "MxString",
      Value: "Gasto de producto en metros",
      Exception: null,
    },
    {
      Tagname: "L001.METROS_DINT.EngUnits",
      Quality: 192,
      Timestamp: "2022-03-13T21:18:20.535+01:00",
      DataType: "MxString",
      Value: "metros",
      Exception: null,
    },
    {
      Tagname: "L001.CTR_CAIXES",
      Quality: 192,
      Timestamp: "2022-03-14T00:04:57.665+01:00",
      DataType: "MxInteger",
      Value: 6,
      Exception: null,
    },
    {
      Tagname: "L001.CTR_CAIXES.Description",
      Quality: 192,
      Timestamp: "2022-01-19T16:26:41.268+01:00",
      DataType: "MxString",
      Value: "Contador produccion precintadora-etiquetadora",
      Exception: null,
    },
    {
      Tagname: "L001.CTR_CAIXES.EngUnits",
      Quality: 0,
      Timestamp: "0001-01-01T00:00:00",
      DataType: null,
      Value: "null",
      Exception: null,
    },
    {
      Tagname: "L001.CTR_PALETS",
      Quality: 192,
      Timestamp: "2022-01-19T16:26:41.268+01:00",
      DataType: "MxInteger",
      Value: 0,
      Exception: null,
    },
    {
      Tagname: "L001.CTR_PALETS.Description",
      Quality: 192,
      Timestamp: "2022-01-19T16:26:41.268+01:00",
      DataType: "MxString",
      Value: "Número de palets TAVIL",
      Exception: null,
    },
    {
      Tagname: "L001.CTR_PALETS.EngUnits",
      Quality: 192,
      Timestamp: "2022-03-13T21:18:20.535+01:00",
      DataType: "MxString",
      Value: "Palets",
      Exception: null,
    },
  ];
  const DESCRIPCION = "Description";
  const ENG_UNITS = "EngUnits";

  /*   [
    {
      signal: "Gasto de producto en metros",
      value: "23",
      unit: "metros",
    },
  ]; */

  if (data.length > 0) {
    const arr = data
      .filter((el) => el.Tagname.split(".")[0] === entName)
      .map((it) => ({ ...it, name: it.Tagname.split(".")[1] }));

    const result = _(arr)
      .groupBy((x) => x.name)
      .map((value, key) => ({ signal: key, data: value }))
      .value(); /* _.groupBy(arr, "name"); */

    console.log("result", result);
    /*   let processedData = [];
    if (newArr.length > 0) {
      processedData = newArr.map((el) => {
        return {
          signal: el.Tagname.split(".")[1],
          value: el.Value,
          unit: el.Tagname.split(".")[2],
        };
      });
    } */
  }
};
