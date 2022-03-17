import axios from "axios";
/**
 * Dev API
 */

// const ENVIRONMENT = 'DEVELOPMENT'
const DISPATCHER_DEVELOPMENT_IP = "192.168.9.128:8083"; //FRIT: 192.168.10.168
const MEMORY_DEVELOPMENT_IP = "192.168.9.128:8095";

var POINTING_IPS = {
  dispatcher: "192.168.9.128:8083",
  memoryDatabase: "192.168.9.128:8095",
  documentacion: "192.168.9.128",
  pesajeCarretillero: "pherkad.frit-nt1.local:4444",
}; //!UNDO

export const ApiCall = async ({ params }) => {
  /* const getEnvVariables = await fetch("config/config.json");
  const {dispatcher} = await getEnvVariables.json(); */
  /*   const getEnvVariables = window.POINTING_IPS */

  const production_uri = `http://${POINTING_IPS.dispatcher}/api/collector/execute`;
  const development_uri = `http://${DISPATCHER_DEVELOPMENT_IP}/api/collector/execute`;

  try {
    const {
      data: { ExecutionResult: response },
    } = await axios({
      method: "post",
      url:
        process.env.NODE_ENV === "production"
          ? production_uri
          : development_uri,
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
  const getEnvVariables = POINTING_IPS;

  /*   const getEnvVariables = await fetch("config/config.json");

  const {memoryDatabase} = await getEnvVariables.json(); */

  const production_uri = `http://${getEnvVariables.memoryDatabase}/api/memoryDatabase/${url}`;
  const development_uri = `http://${MEMORY_DEVELOPMENT_IP}/api/memoryDatabase/${url}`;

  try {
    const {
      data: { DataReader },
    } = await axios({
      method: "post",
      url:
        process.env.NODE_ENV === "production"
          ? production_uri
          : development_uri,
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
