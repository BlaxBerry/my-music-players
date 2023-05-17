import React, { useMemo, useState } from "react"
import { Button, SearchBar, Tabs } from "antd-mobile"
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
import { Album } from "interfaces/__apis/search/__Album"
import { Artist } from "interfaces/__apis/search/__Artist"
import { MV } from "interfaces/__apis/search/__MV"
import { Song } from "interfaces/__apis/search/__Song"
import { Video } from "interfaces/__apis/search/__Video"

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

  const dataSongs = useMemo<Song[]>(
    () => dataSource?.result?.songs || [],
    [dataSource?.result?.songs]
  )

  const dataAlbums = useMemo<Album[]>(
    () => dataSource?.result?.albums || [],
    [dataSource?.result?.albums]
  )
  const dataMVs = useMemo<MV[]>(
    () => dataSource?.result?.mvs || [],
    [dataSource?.result?.mvs]
  )
  const dataVideos = useMemo<Video[]>(
    () => dataSource?.result?.videos || [],
    [dataSource?.result?.videos]
  )
  const dataArtists = useMemo<Artist[]>(
    () => dataSource?.result?.artists || [],
    [dataSource?.result?.artists]
  )

  const isBeginningStatus = useMemo<boolean>(
    () => dataSource === null && error === null && !fetchLoading,
    [dataSource, fetchLoading, error]
  )

  const tabs = useMemo<SearchTabs>(
    () => [
      {
        title: "歌曲",
        key: SEARCH_TYPES.SONGS,
        content: <SongsList data={dataSongs} isLoading={fetchLoading} />,
      },
      {
        title: "专辑",
        key: SEARCH_TYPES.ALBUMS,
        content: <AlbumsList data={dataAlbums} isLoading={fetchLoading} />,
      },
      {
        title: "MV",
        key: SEARCH_TYPES.MVS,
        content: <MVsList data={dataMVs} isLoading={fetchLoading} />,
      },
      {
        title: "视频",
        key: SEARCH_TYPES.VIDEOS,
        content: <VideosList data={dataVideos} isLoading={fetchLoading} />,
      },
      {
        title: "歌手",
        key: SEARCH_TYPES.ARTISTS,
        content: <ArtistsList data={dataArtists} isLoading={fetchLoading} />,
      },
    ],
    [fetchLoading, dataSongs, dataAlbums, dataMVs, dataVideos, dataArtists]
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

                {dataSource?.result?.hasMore && (
                  <Button
                    block
                    onClick={() => {
                      /*refetch*/
                    }}
                  >
                    记载更多...
                  </Button>
                )}
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
