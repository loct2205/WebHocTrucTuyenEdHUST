import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers = {}, params) => {
    // If bodyData is an instance of FormData, do not set the Content-Type header
    const isFormData = bodyData instanceof FormData;
    const finalHeaders = isFormData
        ? headers
        : { "Content-Type": "application/json", ...headers };

    return axiosInstance({
        method,
        url,
        data: bodyData || undefined,
        headers: finalHeaders,
        params,
    });
};