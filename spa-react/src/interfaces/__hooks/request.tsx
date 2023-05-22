export interface RequestHookResponseType<T> {
  // 请求成功时获取的数据
  data: null | T
  // 请求失败时的错误对象
  error: null | unknown
  // 请求是否在发送中
  loading: boolean
  // 再次发送请求
  refetch?: () => void
  // 中断请求
  stop?: () => void
}
