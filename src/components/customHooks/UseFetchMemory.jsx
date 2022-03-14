import { useEffect, useState } from "react";
import {
  tab_materials_init,
  tab_of_parameters,
} from "../../services/OFservices";
import { MemoryDatabaseCall } from "../../services/Service";
import uuid from "react-uuid";
import { read_signals } from "../../services/serviceHelper";
import { tab_consumptions } from "../../services/OFservices";

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

        setData(response.map((item) => ({ ...item, id: uuid() })));
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
  };

  return {
    params: REQUESTS[request][0],
    url: REQUESTS[request][1],
  };
};
