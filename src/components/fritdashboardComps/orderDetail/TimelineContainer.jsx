import React, { useContext, useEffect, useState } from "react";
import { globalDataContext } from "../../../context/ContextProvider";
import { get_utilshift } from "../../../services/OFservices";
import { MemoryDatabaseCall } from "../../../services/Service";
import Timeline from "../../../widgets/timeline/Timeline";

/* import { get_utilshift } from "../services/OFservices";
import { MemoryDatabaseCall } from "../services/Service"; */

const TimelineContainer = () => {
  const { globalData } = useContext(globalDataContext);
  const [timelineData, setTimelineData] = useState(undefined);
  const [unifiedTimeLineData, setUnifiedTimeLineData] = useState(undefined);

  useEffect(() => {
    if (globalData.lineData) {
      fetchTurno(true);
    }
    //eslint-disable-next-line
  }, [globalData.lineData]);

  useEffect(() => {
    let clearIntervalTurnoKey;

    if (timelineData && timelineData.length > 0) {
      unifyData();
      clearIntervalTurnoKey = setInterval(fetchTurno, 15000);
    }
    return () => {
      clearInterval(clearIntervalTurnoKey);
    };
    //eslint-disable-next-line
  }, [timelineData]);

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

    if (response) {
      setTimelineData(response);
    }
  };

  const unifyData = () => {
    let unified;

    unified = timelineData.map((item) => ({
      custom_cd: item.state_cd,
      custom_desc: item.state_desc,
      custom_start_time: item.EventStart,
      custom_end_time: item.EventEnd,
      custom_util_state_desc: item.state_desc,
      custom_reas_cd: item.reas_cd,
      custom_reas_desc: item.reas_desc,
      custom_color: item.color,
      custom_esMicroparo: item.EsMicroparo,
      custom_colorMicroparo: item.colorFiltroMicroparo,
    }));

    setUnifiedTimeLineData(unified);
  };
  return unifiedTimeLineData ? <Timeline data={unifiedTimeLineData} /> : <></>;
};

export default TimelineContainer;
