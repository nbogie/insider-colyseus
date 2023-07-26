import { getEnvVarOrFail } from "./envVars";

export function getServerURL() {
    // const productionServerURL = getEnvVarOrFail("REACT_APP_SERVER_URL");
    const localServerURL = "ws://localhost:2567";
    // const url = productionServerURL;
    // process.env.NODE_ENV === "production"
    //     ? productionServerURL
    //     : localServerURL;
    return localServerURL;
}
