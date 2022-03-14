import uuid from "react-uuid";
import moment from "moment";
import _ from "lodash";

const formatForDropdown = (data) => {
  const result = data.map((d) => {
    return {
      key: d.id,
      text: d.name,
      value: d.id,
    };
  });
  return result;
};

const ruleOfThree = (one, two, three) => {
  const result = (two * three) / one;
  return result;
};

const customDropdown = ({ data, text, value }) => {
  const result = data.map((d) => {
    return {
      key: uuid(),
      text: d[text],
      value: d[value],
    };
  });
  return result;
};

const colorByValue = ({ value, targetOee, yellowThreshold }) => {
  const GREEN = targetOee;
  const YELLOW = (targetOee * yellowThreshold) / 100;
  const RED = targetOee - YELLOW;
  if (!targetOee || !yellowThreshold) {
    return "gray";
  } else {
    if (value < RED) {
      return "red";
    } else if (value < GREEN) {
      return "yellow";
    } else {
      return "green";
    }
  }
};

const dateFormater = ({ date, type }) => {
  const dateProp = date;
  let finalDate;

  if (moment(dateProp).isValid()) {
    switch (type) {
      case "hora-fecha":
        finalDate = moment(dateProp).format("HH:mm:ss DD/MM/YYYY");
        break;
      case "fecha-hora":
        finalDate = moment(dateProp).format("DD/MM/YYYY HH:mm:ss");
        break;
      case "fecha":
        finalDate = moment(dateProp).format("DD/MM/YYYY");
        break;
      case "hora":
        finalDate = moment(dateProp).format("HH:mm:ss");
        break;
      default:
        finalDate = moment(dateProp).format("DD/MM/YYYY HH:mm:ss");
    }
  } else {
    finalDate = "-";
  }

  return finalDate;
};

const timeFormating = (seconds) => {
  let formated;
  if (seconds === 0) {
    formated = "0min 0s";
  } else {
    formated = new Date(seconds * 1000).toISOString();
    formated = formated
      .substring(11, 19)
      .replace(":", "h ")
      .replace(":", "min ");
    formated = formated + "s";
  }

  return formated;
};

const getCustomLot = (entName, lotNo, isTavil) => {
  let lote = "";
  if (lotNo === "LIMPIO") {
    if (isTavil === "isTavil") {
      let line = entName.substring(entName.length - 2, entName.length);
      let year = new Date().getFullYear().toString().substring(4, 3);
      let dayOfYear = moment().dayOfYear().toString();

      while (dayOfYear.length < 3) dayOfYear = "0" + dayOfYear;
      lote = line + year + dayOfYear;
    } else {
      if (isTavil.length > 10) {
        lote = isTavil.slice(isTavil.length - 10);
      } else {
        lote = isTavil;
      }
    }
  } else {
    lote = lotNo;
  }

  return lote;
};

const compareArrays = (array1, array2, sortedKey) => {
  const sortedArray1 = _.sortBy(array1, sortedKey);
  const sortedArray2 = _.sortBy(array2, sortedKey);
  const res = _.isEqual(sortedArray1, sortedArray2);
  return res;
};
const compareObjects = (object1, object2) => {
  if (object1 === undefined || object2 === undefined) {
    return true;
  } else {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }
};

const getItemsPagination = ({ screenWidth }) => {
  let items = 20;
  if (screenWidth) {
    items = Math.round(screenWidth * 0.0087 + 1.3);
  }
  return items;
};

export {
  formatForDropdown,
  ruleOfThree,
  customDropdown,
  colorByValue,
  dateFormater,
  timeFormating,
  getCustomLot,
  compareArrays,
  compareObjects,
  getItemsPagination,
};
