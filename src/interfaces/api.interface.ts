import { type AxiosRequestConfig, type AxiosResponse } from 'axios'

export type TimestampsDto = {
  created_at?: string | null
  created_by?: string | null
  modified_at?: string | null
  modified_by?: string | null
}
export interface ApiRequestProperties extends AxiosRequestConfig {
  withAuth?: boolean
  contentType?: string
  responseType?: AxiosRequestConfig['responseType']
  extraOptions?: AxiosRequestConfig
}

export type GetTypes = object

export interface ApiResponse<T> extends AxiosResponse {
  data: {
    code?: number
    message?: string
    data: T
  }
}

export interface BlobResponse extends AxiosResponse {
  data: BlobPart | Blob
}

export interface DataPaginationDto<T = any, TExtra = any> {
  rows: T[]
  extra?: TExtra
  pagination_meta?: {
    current_page: number
    total_rows: number
    limit: number
    total_pages: number
  }
}

export interface FetchParams {
  page?: number | string
  search?: string
  limit?: number | string
  order?: string
  sort?: string
  is_active?: boolean | null
}
