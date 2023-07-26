export function splitQueryStringIntoParams(
    queryString: string
): Record<string, string> {
    //get key value pairs into an object
    const hashObj = queryString
        .split("&")
        .map((x) => x.split("="))
        .reduce(
            (acc, [key, value]) => {
                acc[key] = value;
                return acc;
            },
            {} as Record<string, string>
        );
    return hashObj;
}
