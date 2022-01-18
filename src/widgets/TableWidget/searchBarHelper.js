export const searchbarFilter = (mainArr, searchbar) => {
  const res = mainArr.filter((o) => {
    let arr = Object.values(o);
    return arr.some((e) =>
      e && typeof e === "string"
        ? e.toLowerCase().includes(searchbar.toLowerCase())
        : e && typeof e === "number"
        ? e.toString().includes(searchbar)
        : false
    );
  });
  return res;
};
