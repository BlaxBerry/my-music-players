export interface ResponseType<T> {
  data: null | T
  loading: boolean
  error: null | unknown
}
