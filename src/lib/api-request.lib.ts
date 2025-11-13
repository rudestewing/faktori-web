import axios, {
  type Method,
  type AxiosRequestConfig,
  AxiosError,
  type AxiosResponse,
} from 'axios'
import {
  ROUTE_PATHS,
  EXCLUDE_QUERY_PARAMETER_KEYS,
} from '@/constants/routes.constant'
import { redirectWithOriginUrl } from '@/lib/router.lib'
import { notifyErrorApi } from './notification.lib'
import { clearUserStorage } from './authentication.lib'
import { isJsonString } from './object.lib'
import {
  type ApiRequestProperties,
  type ApiResponse,
  type FetchParams,
  type DataPaginationDto,
  type TimestampsDto,
} from '@/interfaces/api.interface'

const handleUnauthenticated = async () => {
  try {
    await apiRequest('POST', '/v1/logout')
  } catch (error) {
  } finally {
    clearUserStorage()
    redirectWithOriginUrl(ROUTE_PATHS.login)
  }
}

const loggingResponseError = (error: AxiosError) => {
  const url = error?.config?.url || ''
  const params = error?.config?.params || ''
  const method = error?.config?.method || ''
  let data = error?.config?.data || ''

  if (isJsonString(data)) {
    data = JSON.parse(data)
  }

  console.warn('API REQUEST ERROR', {
    request: {
      url,
      params,
      method,
      data,
    },
    response: {
      ...(error?.response?.data ?? {}),
    },
  })
}

export const setupInterceptors = () => {
  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      loggingResponseError(error)

      notifyErrorApi(error)

      const errors: Record<number, any> = {
        401: (error: any) => {
          // 401 unauthenticated
          handleUnauthenticated()
        },
        422: () => {
          // ...
        },
        403: () => {
          // ...
        },
        500: () => {},
      }

      if (error?.response?.status in errors) {
        const thrower = errors[error?.response?.status as number]
        thrower()
      }

      return Promise.reject(error)
    },
  )
}

const createAxios = <TResponseData extends any>(
  apiRequestConfigs: ApiRequestProperties,
  intercepted = true,
): Promise<AxiosResponse<TResponseData>> => {
  const {
    params,
    baseURL,
    withAuth = true,
    contentType = 'application/json',
    headers = {},
    ...restPropertiesApiRequestConfigs
  } = apiRequestConfigs

  const BASE_URL = baseURL ?? '/application'

  const configHeaders: AxiosRequestConfig['headers'] = {
    'Content-Type': contentType,
    ...headers,
  }

  const configs: AxiosRequestConfig = {
    ...restPropertiesApiRequestConfigs,
    baseURL: BASE_URL,
    headers: configHeaders,
    withCredentials: withAuth,
  }

  if (params) {
    const excludeKeys = EXCLUDE_QUERY_PARAMETER_KEYS

    excludeKeys.forEach((k) => {
      if (k in params) {
        delete (params as any)[k as string]
      }
    })
    configs.params = params
  }

  if (!intercepted) {
    const uninterceptedAxiosInstance = axios.create()
    return uninterceptedAxiosInstance(configs)
  }

  return axios(configs)
}

export const apiRequest = <TData extends any = any>(
  method: ApiRequestProperties['method'],
  url: ApiRequestProperties['url'],
  options?: Omit<ApiRequestProperties, 'method' | 'url'>,
  intercepted = true,
): Promise<ApiResponse<TData>> => {
  return createAxios(
    {
      method,
      url,
      ...options,
    },
    intercepted,
  )
}

export const apiRequestWithBlobResponse = (
  method: ApiRequestProperties['method'],
  url: ApiRequestProperties['url'],
  options?: Omit<ApiRequestProperties, 'method' | 'url'>,
  intercepted = true,
): Promise<AxiosResponse<BlobPart>> => {
  return createAxios(
    {
      method,
      url,
      responseType: 'blob',
      ...options,
    },
    intercepted,
  )
}

export const fakeApiCall = <T extends any>(
  response?: T,
  timeout = 800,
  returnReject = false,
): Promise<T> =>
  new Promise((resolve, reject) => {
    if (returnReject) {
      setTimeout(() => {
        return reject(new Error('fail'))
      }, timeout)
    } else {
      setTimeout(() => {
        return resolve((response || null) as T)
      }, timeout)
    }
  })

export class APICRUDBasic<
  ItemDto extends object,
  Payload extends object,
  IndexType = number | string,
  QueryParameterType = any,
  DetailDto = ItemDto,
> {
  basePath: string
  indexKey: string
  updateMethod: Method

  constructor(basePath: string, indexKey: string) {
    this.basePath = basePath
    this.indexKey = indexKey
    this.updateMethod = 'PUT'
  }

  async getAll(params?: FetchParams & QueryParameterType) {
    const res = await apiRequest<DataPaginationDto<ItemDto & TimestampsDto>>(
      'GET',
      this.basePath,
      {
        params: {
          ...(params || {}),
          limit: -1,
        },
      },
    )
    return res.data
  }

  async fetch(params: FetchParams & QueryParameterType) {
    const res = await apiRequest<DataPaginationDto<ItemDto & TimestampsDto>>(
      'GET',
      this.basePath,
      {
        params,
      },
      false,
    )
    return res.data
  }

  async create(body: Payload) {
    const res = await apiRequest<DataPaginationDto<ItemDto & TimestampsDto>>(
      'POST',
      this.basePath,
      {
        data: body,
      },
    )
    return res.data
  }

  async get(index: IndexType) {
    const res = await apiRequest<DetailDto & TimestampsDto>(
      'GET',
      `${this.basePath}/${index}`,
    )
    return res.data
  }

  async update(index: IndexType, body: Payload) {
    const res = await apiRequest<any>(this.updateMethod, this.basePath, {
      data: {
        [this.indexKey]: index,
        ...body,
      },
    })
    return res.data
  }

  async delete(index: IndexType) {
    const res = await apiRequest<any>('DELETE', this.basePath, {
      data: {
        [this.indexKey]: index,
      },
    })
    return res.data
  }
}

export async function sleep(duration = 1000) {
  return new Promise((res) => setTimeout(res, duration))
}
