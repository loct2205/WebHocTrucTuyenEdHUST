import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers = {}, params) => {
    const token = JSON.parse(localStorage.getItem("token"));
    return axiosInstance({
        method,
        url,
        data: bodyData || undefined,
        headers: { 
            "Content-Type": "application/json", 
            ...(token && { "Authorization": `Bearer ${token}` }), 
            ...headers 
        },
        params,
    });
};