import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import modalNotification from "./notification";

interface APIRequestProps {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  baseURL?: string;
  queryParams?: Record<string, any>;
  bodyData?: Record<string, any>;
  cancelFunction?: (cancel: CancelTokenSource) => void;
  formHeaders?: Record<string, string>;
  removeHeaders?: boolean;
}

const APIrequest = async ({
  method = "GET",
  url,
  baseURL,
  queryParams,
  bodyData,
  cancelFunction,
  formHeaders,
  removeHeaders,
}: APIRequestProps): Promise<any> => {

  try {
    const axiosConfig: AxiosRequestConfig = {
      method,
      baseURL: "http://localhost:5050/api",
      headers: {
        "content-type": "application/json",
        "X-Frame-Options": "sameorigin",
      },
    };

    // if (formHeaders) {
    //   axiosConfig.headers = { ...axiosConfig.headers, ...formHeaders };
    // }

    if (url) {
      axiosConfig.url = url;
    }

    if (queryParams) {
      const queryParamsPayload: Record<string, any> = {};
      for (const key in queryParams) {
        if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
          let element = queryParams[key];
          if (typeof element === "string") {
            element = element.trim();
          }
          if (!["", null, undefined, NaN].includes(element)) {
            queryParamsPayload[key] = element;
          }
        }
      }
      axiosConfig.params = queryParamsPayload;
    }

    if (bodyData) {
      const bodyPayload: Record<string, any> = {};
      for (const key in bodyData) {
        if (Object.prototype.hasOwnProperty.call(bodyData, key)) {
          let element = bodyData[key];
          if (typeof element === "string") {
            element = element.trim();
          }
          if (![null, undefined, NaN].includes(element)) {
            bodyPayload[key] = element;
          }
        }
      }
      axiosConfig.data = bodyPayload;
    }
    // if (removeHeaders) {
    //   delete axiosConfig.headers;
    // }

    // if (apiToken) {
    //   axiosConfig.headers = {
    //     ...axiosConfig.headers,
    //     authorization: `Bearer ${apiToken}`,
    //   };
    // }
    console.log("hjjmhj    --",axiosConfig)
    const res: AxiosResponse = await axios(axiosConfig);
    return res.data;
  } catch (error: any) {
    console.log("ghhgh   :: ",error)
    if (axios.isCancel(error)) {
      console.log("API canceled", error);
      throw new Error(error.message);
    } else {
      const errorRes = error.response;
      console.log("Error in the API request", errorRes);

      if (errorRes?.status === 403) {
        // Handle 403: Update permission or take appropriate action
      }
      if (errorRes?.status === 500) {
        modalNotification({
          type: "error",
          message: errorRes.data.message || errorRes.data.error.description,
        });
        return errorRes.data;
      }
      if (errorRes?.status === 400) {
        if (errorRes.data.message) {
          modalNotification({
            type: "warning",
            message: errorRes.data.message,
          });
        }
      }
      if (errorRes?.status === 401) {
        modalNotification({
          type: "error",
          message: errorRes?.data?.message,
        });
        const path =
          window.location.pathname.search("admin") > 0 ? "/admin" : "/";
        window.location.replace(path);
      }
      if (errorRes?.status === 429) {
        modalNotification({
          type: "error",
          message: errorRes.data.message || errorRes.data.error.description,
        });
      }
      if (errorRes?.data?.message) {
        modalNotification({
          type: "error",
          message: errorRes?.data?.message,
        });
      } else if (errorRes?.data?.error?.length > 0) {
        modalNotification({
          type: "error",
          message: errorRes?.data?.error[0]?.message,
        });
      }
      return null;
    }
  }
};

export default APIrequest;
