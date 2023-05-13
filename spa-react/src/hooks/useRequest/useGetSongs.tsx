import { useCallback, useEffect, useState } from "react"
import { Song } from "interfaces/__apis/search/__Song"
import { RequestHookResponseType } from "interfaces/__hooks/request"
import fetchData from "utils/helpers/fetch"

interface UseGetSongsProps {
  dataSource: Song[] | undefined
}

type UseGetSongsResult = RequestHookResponseType<Array<Song>>

export default function useGetSongs({ dataSource }: UseGetSongsProps) {
  const [state, setState] = useState<UseGetSongsResult>({
    data: null,
    loading: false,
    error: null,
  })

  const getSongIDs = useCallback(
    (songs: Song[]) =>
      songs
        .map((item) => ({ id: item.id }))
        .reduce((pre: number[], cur: { id: number }) => {
          pre.push(cur.id)
          return pre
        }, []),
    []
  )

  const request = useCallback((songIDs: number[]) => {
    if (!songIDs) return
    fetchData<UseGetSongsResult>({
      url: `https://autumnfish.cn/song/detail?ids=${songIDs}`,
      pending: () => setState({ data: null, loading: true, error: null }),
      rejected: (error) => setState({ data: null, loading: false, error }),
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      resolved: (data: any) => {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const result = data?.songs?.map((item: any) => ({
          id: item.id,
          name: item.name,
          duration: item.dt,
          publishTime: item.publishTime,
          url: item.al.picUrl,
          mvid: item.mv,
          album: item.al,
          artists: item.ar,
        })) as Song[]
        setState({ data: result, loading: false, error: null })
      },
    })
  }, [])

  useEffect(() => {
    // pending
    setState({ data: null, loading: true, error: null })

    if (dataSource?.length) {
      const songIDs = getSongIDs(dataSource)
      if (songIDs) request(songIDs)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource])

  return state
}
