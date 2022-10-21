import React, { useEffect, useState } from "react";
import moment from "moment";
import { getColorFromBackend } from "./../../components/fritdashboardComps/orderDetail/helper";
import Tooltip from "@mui/material/Tooltip";

const GradientTimeline = ({ data }) => {
  const INIT_GRADIENT = {
    height: "50px",
    background: "#fafafa",
  };
  const [gradientColor, setGradientColor] = useState(INIT_GRADIENT);
  const [timelineColors, setTimelineColors] = useState("");
  const [dates, setDates] = useState("");
  const [dataPairs, setDataPairs] = useState(undefined); //tooltip

  const calculatePercentage = ({ end, start, total }) => {
    const result = (moment(end).diff(moment(start), "seconds") * 100) / total;
    return parseFloat(result.toFixed(1));
  };

  const gradientPercentage = ({ totalSecs, currentObj, min }) => {
    const percentage =
      (moment(currentObj.EventEnd).diff(
        moment(currentObj.EventStart),
        "seconds"
      ) *
        100) /
      totalSecs;
    return {
      percentage: parseFloat(percentage.toFixed(1)),
      color: getColorFromBackend({
        microparo: false,
        decFormatColor: currentObj.color,
      }).background,
      init: calculatePercentage({
        end: currentObj.EventStart,
        start: min,
        total: totalSecs,
      }),
      end: calculatePercentage({
        end: currentObj.EventEnd,
        start: min,
        total: totalSecs,
      }),
      // start tooltip - content for tooltip
      tooltipData: {
        title: currentObj.reas_desc,
        start: currentObj.EventStart,
        end: currentObj.EventEnd,
      },
      // end tooltip
    };
  };

  const getDateTicks = (start, end) => {
    const minutesDiff = moment(end).diff(moment(start), "minutes");
    const hoursDiff = moment(end).diff(moment(start), "hours");

    if (hoursDiff < 13) {
      const initDate = {
        date: moment(start).format("HH:mm"),
        px: 0,
      };
      const endDate = {
        date: moment(end).format("HH:mm"),
        px: 100,
      };

      const test = [...new Array(hoursDiff + 1)].map((el, i) => {
        const date = moment(start)
          .add(i + 1, "hours")
          .startOf("hour");
        const diff = date.diff(moment(start), "minutes");
        const enddiff = moment(end).diff(date, "minutes");

        if (diff < 45 || enddiff < 45) {
          //eslint-disable-next-line
          return;
        }
        const px = (diff * 100) / minutesDiff;
        return {
          date: moment(date).format("HH:mm"),
          px,
        };
      });

      return [initDate, ...test, endDate];
    } else if (hoursDiff < 200) {
      const initDate = {
        date: moment(start).format("DD/MM"),
        time: moment(start).format("HH:mm"),
        px: 0,
      };
      const endDate = {
        date: moment(end).format("DD/MM"),
        time: moment(end).format("HH:mm"),
        px: 100,
      };
      const daysDiff = moment(end).diff(moment(start), "days");

      const test = [...new Array(daysDiff)].map((el, i) => {
        const date = moment(start)
          .add(i + 1, "days")
          .startOf("day");
        const diff = date.diff(moment(start), "hours");
        const enddiff = moment(end).diff(date, "hours");

        if (diff < 10 || enddiff < 15) {
          //eslint-disable-next-line
          return;
        }
        const px = (diff * 100) / hoursDiff;
        return {
          date: moment(date).format("DD/MM"),
          px,
        };
      });

      return [initDate, ...test, endDate];
    } else {
      return [
        {
          date: moment(start).format("DD/MM"),
          time: moment(start).format("HH:mm"),
          px: 0,
        },
        {
          date: moment(end).format("DD/MM"),
          time: moment(end).format("HH:mm"),
          px: 100,
        },
      ];
    }
  };

  const formatData = (data) => {
    const min = data[0].EventStart;
    const max = data[data.length - 1].EventEnd;
    const shiftInSeconds = moment(max).diff(moment(min), "seconds");
    let percentages = data.map((d) =>
      gradientPercentage({ totalSecs: shiftInSeconds, currentObj: d, min })
    );
    setDataPairs(percentages); //tooltip
    let gradient = percentages
      .filter((o) => o.init !== o.end)
      .map((e) => `${e.color} ${e.init}%, ${e.color} ${e.end}%`);
    gradient = `${gradient}`;
    setTimelineColors(gradient);
    const datesArr = getDateTicks(min, max);
    setDates(datesArr);
  };

  useEffect(() => {
    if (data.length > 0) {
      formatData(data);
    } else {
      setGradientColor(INIT_GRADIENT);
      setDates([]);
    }
    //eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (timelineColors) {
      setGradientColor({
        ...gradientColor,
        background: `linear-gradient(90deg, ${timelineColors})`,
      });
    } //eslint-disable-next-line
  }, [timelineColors]);

  return (
    <div style={{ margin: "6px 8px 12px" }}>
      <div
        style={{
          ...gradientColor,
          height: 50,
        }}
      >
        {/* begin tooltip */}
        {dataPairs &&
          dataPairs.map((d, i) => (
            <Tooltip
              title={
                <div style={{ whiteSpace: "pre-line" }}>
                  {`${d.tooltipData.title}
                  Inicio: ${moment(d.tooltipData.start).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                  Fin   : ${moment(d.tooltipData.end).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}`}
                </div>
              }
              arrow
            >
              <a
                key={`data${i}`}
                style={{
                  display: "inline-block",
                  height: "100%",
                  width: `${d.end - d.init}%`,
                  backgroundColor: "transparent",
                }}
              ></a>
            </Tooltip>
          ))}
        {/* end tooltip */}
      </div>
      <div style={{ position: "relative" }}>
        {dates &&
          dates.length > 0 &&
          dates
            .filter((el) => el)
            .map((d) => (
              <div
                style={{
                  position: "absolute",
                  left: `${d.px}%`,
                  /* top: d.time && -10, */
                  color: "#555",
                  fontSize: 10.5,
                  borderLeft: "1px solid #ccc",
                }}
              >
                <p style={{ marginBottom: 0 }}>{d.date}</p>

                {d.time && (
                  <>
                    <p style={{ marginBottom: 0 }}>({d.time}h)</p>
                  </>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default GradientTimeline;
