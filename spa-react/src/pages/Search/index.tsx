import React, { useEffect, useMemo, useState } from "react"
import { SearchBar, Tabs } from "antd-mobile"
import {
  SongsList,
  AlbumsList,
  MVsList,
  VideosList,
  ArtistsList,
} from "./SearchLists"
import { EmptyError } from "components/common/Results"
import TermsOfService from "pages/TermsOfService"
import useRequestSearch, {
  SEARCH_TYPES,
} from "hooks/useRequest/useRequestSearch"
import { SearchResult } from "interfaces/__apis/search"

type SearchTabs = Array<{ title: string; key: number; content: JSX.Element }>

export default React.memo(function Search() {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selectedType, setSelectedType] = useState<number>(SEARCH_TYPES.SONGS)

  const {
    data: dataSource,
    loading: fetchLoading,
    error,
  } = useRequestSearch({
    keyword: searchValue,
    type: Number(selectedType),
  })

  const [dataSongs, setDataSongs] = useState<SearchResult["result"]["songs"]>()
  const [dataAlbums, setDataAlbums] =
    useState<SearchResult["result"]["albums"]>()
  const [dataMVs, setDataMVs] = useState<SearchResult["result"]["mvs"]>()
  const [dataVideos, setDataVideos] =
    useState<SearchResult["result"]["videos"]>()
  const [dataArtists, setDataArtists] =
    useState<SearchResult["result"]["artists"]>()

  useEffect(() => {
    if (!dataSource?.result?.songs) return
    const songIDs = dataSource?.result?.songs
      ?.map((item: any) => ({ id: item.id }))
      .reduce((pre: any, cur: any) => {
        pre.push(cur.id)
        return pre
      }, [])
    fetch(`https://autumnfish.cn/song/detail?ids=${songIDs}`)
      .then((res) => res.json())
      .then((data) => {
        const result = data?.songs?.map((item: any) => ({
          id: item.id,
          name: item.name,
          duration: item.dt,
          publishTime: item.publishTime,
          url: item.al.picUrl,
          mvid: item.mv,
          album: item.al,
          artists: item.ar,
        }))
        setDataSongs(result)
      })
  }, [dataSource?.result?.songs])

  useEffect(() => {
    if (dataSource?.result?.albums) setDataAlbums(dataSource?.result?.albums)
    if (dataSource?.result?.mvs) setDataMVs(dataSource?.result?.mvs)
    if (dataSource?.result?.videos) setDataVideos(dataSource?.result?.videos)
    if (dataSource?.result?.artists) setDataArtists(dataSource?.result?.artists)
  }, [dataSource?.result?.albums, dataSource?.result?.mvs, dataSource?.result?.videos, dataSource?.result?.artists])

  const isBeginningStatus = useMemo<boolean>(
    () => dataSource === null && error === null && !fetchLoading,
    [dataSource, fetchLoading, error]
  )

  const tabs = useMemo<SearchTabs>(
    () => [
      {
        title: "歌曲",
        key: SEARCH_TYPES.SONGS,
        content: (
          <SongsList data={dataSongs} loading={fetchLoading || !dataSongs} />
        ),
      },
      {
        title: "专辑",
        key: SEARCH_TYPES.ALBUMS,
        content: (
          <AlbumsList data={dataAlbums} loading={fetchLoading || !dataAlbums} />
        ),
      },
      {
        title: "MV",
        key: SEARCH_TYPES.MVS,
        content: <MVsList data={dataMVs} loading={fetchLoading || !dataMVs} />,
      },
      {
        title: "视频",
        key: SEARCH_TYPES.VIDEOS,
        content: (
          <VideosList data={dataVideos} loading={fetchLoading || !dataVideos} />
        ),
      },
      {
        title: "歌手",
        key: SEARCH_TYPES.ARTISTS,
        content: (
          <ArtistsList
            data={dataArtists}
            loading={fetchLoading || !dataArtists}
          />
        ),
      },
    ],
    [dataSongs, dataAlbums, dataMVs, dataVideos, dataArtists]
  )

  return (
    <>
      <SearchBar
        onSearch={(val: string) => setSearchValue(val.trim())}
        showCancelButton
        onClear={() => setSearchValue("")}
        placeholder="请输入内容"
        style={{
          "--border-radius": "100px",
          "--height": "32px",
          "--padding-left": "12px",
        }}
      />

      <Tabs
        defaultActiveKey={SEARCH_TYPES.SONGS.toString()}
        onChange={(key: string) => setSelectedType(Number(key))}
      >
        {tabs.map(({ key, title, content }) => (
          <Tabs.Tab key={key} title={title}>
            {/*1. rejected */}
            {!!error && <EmptyError />}

            {/* 3. resolved */}
            {!isBeginningStatus && (
              <div
                style={{ height: "calc(100vh - 140px)", overflowY: "scroll" }}
              >
                {content}
              </div>
            )}

            {/* 4. 注意事项 */}
            {isBeginningStatus && <TermsOfService />}
          </Tabs.Tab>
        ))}
      </Tabs>
    </>
  )
})
