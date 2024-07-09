import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

const config: AxiosRequestConfig = {
  baseURL: '',
  timeout: 5000,
  withCredentials: true,
}
export class HttpRequest {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config
      }
    )

    this.service.interceptors.response.use((response: AxiosResponse) => {
      return response
    })
  }
}

export default new HttpRequest(config)
