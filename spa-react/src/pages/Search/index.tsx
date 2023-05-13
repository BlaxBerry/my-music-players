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
import useRequestSearch, { SEARCH_TYPES } from "hooks/useRequest/useSearch"
import useGetSongs from "hooks/useRequest/useGetSongs"
import { Album } from "interfaces/__apis/search/__Album"
import { Artist } from "interfaces/__apis/search/__Artist"
import { Video } from "interfaces/__apis/search/__Video"
import { MV } from "interfaces/__apis/search/__MV"

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

  const { data: dataSongs, loading: dataSongsLoading } = useGetSongs({
    dataSource: dataSource?.result?.songs,
  })

  const [dataAlbums, setDataAlbums] = useState<Array<Album>>([])
  const [dataMVs, setDataMVs] = useState<Array<MV>>([])
  const [dataVideos, setDataVideos] = useState<Array<Video>>([])
  const [dataArtists, setDataArtists] = useState<Array<Artist>>([])

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
        content: <SongsList data={dataSongs} loading={dataSongsLoading} />,
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
    [
      fetchLoading,
      dataSongs,
      dataSongsLoading,
      dataAlbums,
      dataMVs,
      dataVideos,
      dataArtists,
    ]
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
