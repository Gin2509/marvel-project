import axios, { AxiosInstance, AxiosResponse } from "axios";

const API = process.env.VUE_APP_ROOT_API;

interface Params {
  [key: string]: any;
}

class HttpApiClient {
  private apiClient: AxiosInstance = axios.create({
    baseURL: API,
    params: {
      apikey: process.env.VUE_APP_MARVEL_API_KEY,
      ts: process.env.VUE_APP_TS,
      hash: process.env.VUE_APP_MARVEL_HASH,
    },
  });

  public async getHttp(
    url: string,
    params: Params | null = null
  ): Promise<AxiosResponse> {
    try {
      return await this.apiClient.get(url, { ...params });
    } catch (error: any) {
      return error?.response;
    }
  }
}

export default new HttpApiClient();
