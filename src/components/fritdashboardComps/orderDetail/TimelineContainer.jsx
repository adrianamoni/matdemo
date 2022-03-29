import React, { useContext, useEffect, useMemo, useState } from "react";
import { globalDataContext } from "../../../context/ContextProvider";
import { get_utilshift } from "../../../services/OFservices";
import { MemoryDatabaseCall } from "../../../services/Service";
import Timeline from "../../../widgets/timeline/Timeline";

/* import { get_utilshift } from "../services/OFservices";
import { MemoryDatabaseCall } from "../services/Service"; */

const TimelineContainer = () => {
  const { globalData } = useContext(globalDataContext);
  const [timelineData, setTimelineData] = useState(undefined);

  useEffect(() => {
    let clearIntervalTurnoKey;
    if (globalData.lineData) {
      fetchTurno(true);
      clearIntervalTurnoKey = setInterval(fetchTurno, 10000); //20000
    }
    return () => {
      clearInterval(clearIntervalTurnoKey);
    };
    //eslint-disable-next-line
  }, [globalData.lineData]);

  const fetchTurno = async (firstAttempt) => {
    firstAttempt = firstAttempt || false;

    const filter = [
      {
        filterExpression: null,
        filterItem: {
          column: "ent_id",
          dataType: "INT",
          value: globalData.lineData.entId,
          filterItemType: "Equal",
          checkDBNull: false,
        },
      },
    ];
    const response = await MemoryDatabaseCall({
      params: get_utilshift({ filter }),
      url: "queryDataFrameDataAsync",
    });

    if (response && response.length > 0) {
      const arr = response.map((item, i, arr) => {
        if (i + 1 === arr.length) {
          return { ...item, EventEnd: undefined };
        } else {
          return { ...item };
        }
      });
      console.log("RENDERED CONTAINER");
      setTimelineData(arr);
    }
  };

  return timelineData ? <MyComponent2 data={timelineData} /> : null;
};

function MyComponent2({ data }) {
  console.log("RENDERED MEMO", data);
  const memoizedTimeline = useMemo(() => {
    return data.sort();
  }, [data]);

  return memoizedTimeline ? <Timeline data={memoizedTimeline} /> : null;
}

export default TimelineContainer;
