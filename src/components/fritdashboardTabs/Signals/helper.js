import _ from "lodash";
import uuid from "react-uuid";

export const processData = (data, entName) => {
  const DESCRIPCION = "Description";
  const ENG_UNITS = "EngUnits";

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
        [item.tag]:
          item.Quality === 192
            ? item.DataType === "MxBoolean"
              ? item.Value.toString()
              : item.Value
            : item.tag === "description"
            ? `(${item.Tagname})`
            : null,
      })),
    }));

    const test2 = test.map((el) => ({
      ...el,
      data: Object.assign({}, ...el.data),
    }));
    const res = test2.map((el) => ({ ...el.data, id: uuid() }));

    return res;
  }
};
