export const getCompanyIdFromEndpoint = (url) => {
    //splitt
    const params = url.split('/');
    return params[params.length -1]
}
