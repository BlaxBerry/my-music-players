export interface RequestHookResponseType<T> {
  data: null | T
  loading: boolean
  error: null | unknown
}
