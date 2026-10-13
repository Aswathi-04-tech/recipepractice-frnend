import axios from "axios";

export const commonApi = async (httpRequest, URL, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpRequest,
        url: URL,
        data: reqBody,
        headers: reqHeader
    }
    return await axios(reqConfig).then((res) => {
        return res
    }).catch((error) => {
        return error
    })
}