import axios from "axios";

const configIps = POINTING_IPS;

export const ApiCall = async ({ params }) => {
  try {
    const {
      data: { ExecutionResult: response },
    } = await axios({
      method: "post",
      url: `http://${configIps.dispatcher}/api/collector/execute`,
      data: params,
    });

    if (response.ResultCode === "0") {
      return {
        responseCode: response.ResultCode,
        responseData: response.Data,
        responseHide: response.AutoHide,
        responseException: response.ExceptionData,
      };
    } else {
      return {
        responseError: response.ResultCode,
        responseMsg: response.ExceptionData,
        responseHide: response.AutoHide,
      };
    }
  } catch (error) {
    return { responseError: "Unknown error" };
  }
};
export const MemoryDatabaseCall = async ({ params, url }) => {
  try {
    const {
      data: { DataReader },
    } = await axios({
      method: "post",
      url: `http://${configIps.memoryDatabase}/api/memoryDatabase/${url}`,
      data: params,
    });
    if (DataReader) {
      return DataReader;
    } else {
      return { responseError: "Memory DB error" };
    }
  } catch (error) {
    return { responseError: "Unknown error" };
  }
};
