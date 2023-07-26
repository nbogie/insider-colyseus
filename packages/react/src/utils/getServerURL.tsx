import { getEnvVarOrFail } from "./envVars";

export function getServerURL() {
    const serverURL = getEnvVarOrFail("REACT_APP_SERVER_URL");
    // process.env.NODE_ENV === "production"
    //     ? productionServerURL
    //     : localServerURL;
    return serverURL;
}
