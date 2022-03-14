import { useEffect, useState } from "react";
import {
  get_pending_samples,
  tab_materials_init,
  tab_of_parameters,
  tab_consumptions,
  tab_productions,
  tab_quality_get_qmspec_by_filter,
  screen_of_last_cleaning,
} from "../../services/OFservices";
import { MemoryDatabaseCall } from "../../services/Service";
import uuid from "react-uuid";
import {
  cleaning_order_time,
  read_signals,
} from "../../services/serviceHelper";

export default function UseFetchMemory({ request, customParams }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parameters = getParams(request);

        const response = await MemoryDatabaseCall({
          params: parameters.params(customParams || {}),
          url: parameters.url,
        });

        if (response && response.length > 0) {
          setData(response.map((item) => ({ ...item, id: uuid() })));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {};
  }, []);

  return { data, error, loading };
}

const getParams = (request) => {
  const REQUESTS = {
    parameters: [tab_of_parameters, "queryDataAsync"],
    "material-list": [tab_materials_init, "queryDataAsync"],
    "variables-signals": [read_signals, "queryWWDataFrameDataAsync"],
    consumptions: [tab_consumptions, "queryDataAsync"],
    productions: [tab_productions, "queryDataAsync"],
    "quality-qmspec": [tab_quality_get_qmspec_by_filter, "queryDataAsync"],
    pendingSamples: [get_pending_samples, "queryDataFrameDataAsync"],
    timePerOrder: [cleaning_order_time, "queryDataAsync"],
    lastCleaning: [screen_of_last_cleaning, "queryDataAsync"],
  };

  return {
    params: REQUESTS[request][0],
    url: REQUESTS[request][1],
  };
};
