import { useCallback, useEffect, useState } from "react"
import { SearchResult } from "interfaces/__apis/search"
import { ResponseType } from "interfaces/__hooks/request"
import fetchData from "utils/helpers/fetch"

interface useRequestSearchSongsProps {
  keyword: string
  type?: number
  limit?: number
  page?: number
  offset?: number
}

export type UseRequestSearchSongsResult = ResponseType<SearchResult>

export default function useRequestSearc({
  keyword,
  type = SEARCH_TYPES.SONGS,
  limit = 30,
  page = 1,
  offset = 0,
}: useRequestSearchSongsProps) {
  const url = `https://autumnfish.cn/search?keywords=${keyword}&type=${type}&limit=${limit}&page=${page}&offset=${offset}`

  const [state, setState] = useState<UseRequestSearchSongsResult>({
    data: null,
    loading: false,
    error: null,
  })

  const request = useCallback(() => {
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
  }, [keyword, type])

  return state
}

export const SEARCH_TYPES = {
  SONGS: 1,
  ALBUMS: 10,
  MVS: 1004,
  VIDEOS: 1014,
  ARTISTS: 100,
} as const

// export const SEARCH_TYPES_KEYS = {
//   1: "songs",
//   10: "albums",
//   1004: "mvs",
//   1014: "videos",
// } as const

// const SEARCH_TYPES_NAMES = {
//   1: "歌曲",
//   10: "专辑",
//   1004: "MV",
//   1006: "歌词",
//   1014: "视频",
// } as const
