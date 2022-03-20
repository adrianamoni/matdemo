import { useEffect, useState } from "react";
import { ApiCall } from "../../services/Service";
import uuid from "react-uuid";
import { screen_of_start_btn } from "../../services/OFservices";

export default function UseDispatcher({ request, customParams }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sendData = async () => {
      try {
        const parameters = getParams(request);

        const response = await ApiCall({
          params: parameters.params(customParams || {}),
        });
        /* setData(response.map((item) => ({ ...item, id: uuid() }))); */
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    sendData();
    return () => {};
  }, []);

  return { data, error, loading };
}

const getParams = (request) => {
  const REQUESTS = {
    playButton: screen_of_start_btn,
    /*  parameters: [tab_of_parameters, "queryDataAsync"],
    "material-list": [tab_materials_init, "queryDataAsync"],
    "variables-signals": [read_signals, "queryWWDataFrameDataAsync"],
    consumptions: [tab_consumptions, "queryDataAsync"],
    "quality-qmspec": [tab_quality_get_qmspec_by_filter, "queryDataAsync"], */
  };

  return {
    params: REQUESTS[request],
  };
};
