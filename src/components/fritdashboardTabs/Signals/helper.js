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
      Quality: 0,
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
      .map((it) => {
        let addProp;
        if (it.Tagname.split(".")[2] === DESCRIPCION) {
          addProp = { tag: "description" };
        } else if (it.Tagname.split(".")[2] === ENG_UNITS) {
          addProp = { tag: "unit" };
        } else {
          addProp = { tag: "value" };
        }
        return { ...it, name: it.Tagname.split(".")[1], ...addProp };
      });
    const result = _(arr)
      .groupBy((x) => x.name)
      .map((value, key) => ({ signal: key, data: value }))
      .value();
    const test = result.map((el) => ({
      ...el,
      data: el.data.map((item) => ({
        [item.tag]: item.Quality === 192 ? item.Value : null,
      })),
    }));

    const test2 = test.map((el) => ({
      ...el,
      data: Object.assign({}, ...el.data),
    }));
    const res = test2.map((el) => ({ ...el.data }));

    return res;
  }
};
