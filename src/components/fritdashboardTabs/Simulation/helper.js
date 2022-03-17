import { compareArrays } from "../../common/helpers/helper";

export const checkIfModified = (arr1, arr2) => {
  let enableSave = false;

  const areArraysEqual = compareArrays(arr1, arr2, "id");
  if (!areArraysEqual) {
    enableSave = true;
  }

  return enableSave;
};
