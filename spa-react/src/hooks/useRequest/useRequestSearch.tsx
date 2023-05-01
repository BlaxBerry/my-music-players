import { useEffect, useState } from "react"
import { SearchResult } from "types/__apis/search"
import { ResponseType } from "interfaces/__hooks/request"
import fetch from "utils/helpers/fetch"

interface useRequestSearchSongsProps {
  keyword: string
  type?: number
  limit?: number
  page?: number
  offset?: number
}

export default function useRequestSearc(props: useRequestSearchSongsProps) {
  const { keyword, type = 1, limit = 30, page = 1, offset = 0 } = props
  const url = `https://autumnfish.cn/search?keywords=${keyword}&type=${type}&limit=${limit}&page=${page}&offset=${offset}`

  const [state, setState] = useState<ResponseType<SearchResult>>({
    data: null,
    loading: false,
    error: null,
  })

  const fetchData = async () => {
    try {
      setState({ data: null, loading: true, error: null })
      const response = await fetch(url)
      const result = await response.json()
      if (!response.ok) setState({ data: null, loading: false, error: result })
      else setState({ data: result, loading: false, error: null })
    } catch (error) {
      setState({ data: null, loading: false, error })
    }
  }

  useEffect(() => {
    if (props) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}
