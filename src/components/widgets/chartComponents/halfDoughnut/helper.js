const getColorCodeFromName = (color, value) => {
  let color1, color2;
  if (color === "green") {
    color1 = "#63EC9B";
    color2 = "#1FCF68";
  } else if (color === "orange" || color === "yellow") {
    color1 = "#F9CF5C";
    color2 = "#F4AD0E";
  } else if (color === "blue") {
    color1 = "#62B4EA";
    color2 = "#1E88CE";
  } else if (color === "red") {
    color1 = "#EA6262";
    color2 = "#B72F2F";
  } else if (color === "gray") {
    color1 = "rgb(225,225,225)";
    color2 = "rgb(215,215,215)";
  }

  if (value === 0 || value === null) {
    color1 = "rgb(225,225,225)";
    color2 = "rgb(215,215,215)";
  }
  return { color1, color2 };
};

export { getColorCodeFromName };
