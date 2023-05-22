import { useCallback, useEffect, useState } from "react"
import { SearchResult } from "interfaces/__apis/search"
import { RequestHookResponseType } from "interfaces/__hooks/request"
import fetchData from "utils/helpers/fetch"

export interface UseSearchProps {
  keyword: string
  type?: SearchTypes
  limit?: number
  page?: number
  offset?: number
}

type UseSearchReturn = RequestHookResponseType<SearchResult>
type UseSearchResult = RequestHookResponseType<SearchResult>

export default function useSearch(props: UseSearchProps): UseSearchReturn {
  const {
    keyword,
    type = SearchTypes.Songs,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    offset: offsetDefault = DEFAULT_OFFSET,
  } = props

  const offset = (page - 1) * limit || offsetDefault
  const url = `https://autumnfish.cn/search?keywords=${keyword}&type=${type}&limit=${limit}&page=${page}&offset=${offset}`

  const [state, setState] = useState<UseSearchResult>({
    data: null,
    loading: false,
    error: null,
  })

  const request = useCallback((): void => {
    fetchData<SearchResult>({
      url,
      pending: () => setState({ data: null, loading: true, error: null }),
      resolved: (data) => setState({ data: data, loading: false, error: null }),
      rejected: (error) => setState({ data: null, loading: false, error }),
    })
  }, [url])

  useEffect(() => {
    if (keyword) request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, type, offset])

  return {
    ...state,
    refetch: request,
  }
}

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 30
export const DEFAULT_OFFSET = (DEFAULT_PAGE - 1) * DEFAULT_LIMIT

export const enum SearchTypes {
  // 歌曲
  Songs = 1,
  // 专辑
  Albums = 10,
  // MV
  MVs = 1004,
  // 歌词
  Videos = 1014,
  // 视频
  Artists = 100,
}
