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
import useRequestSearch, {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  DEFAULT_PAGE,
  SearchTypes,
  UseSearchProps,
} from "hooks/useRequest/useSearch"
import { Album } from "interfaces/__apis/search/__Album"
import { Artist } from "interfaces/__apis/search/__Artist"
import { MV } from "interfaces/__apis/search/__MV"
import { Song } from "interfaces/__apis/search/__Song"
import { Video } from "interfaces/__apis/search/__Video"

export default React.memo(function Search() {
  const [searchProps, setSearchProps] = useState<Required<UseSearchProps>>({
    keyword: "",
    type: SearchTypes.Songs,
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
  })

  const {
    data: dataSource,
    loading: fetchLoading,
    error,
  } = useRequestSearch(searchProps)

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

  const tabs = useMemo<
    Array<{
      title: string
      key: SearchTypes
      content: JSX.Element
    }>
  >(
    () => [
      {
        title: "歌曲",
        key: SearchTypes.Songs,
        content: <SongsList data={dataSongs} isLoading={fetchLoading} />,
      },
      {
        title: "专辑",
        key: SearchTypes.Albums,
        content: <AlbumsList data={dataAlbums} isLoading={fetchLoading} />,
      },
      {
        title: "MV",
        key: SearchTypes.MVs,
        content: <MVsList data={dataMVs} isLoading={fetchLoading} />,
      },
      {
        title: "视频",
        key: SearchTypes.Videos,
        content: <VideosList data={dataVideos} isLoading={fetchLoading} />,
      },
      {
        title: "歌手",
        key: SearchTypes.Artists,
        content: <ArtistsList data={dataArtists} isLoading={fetchLoading} />,
      },
    ],
    [fetchLoading, dataSongs, dataAlbums, dataMVs, dataVideos, dataArtists]
  )

  return (
    <>
      <SearchBar
        onSearch={(val: string) =>
          setSearchProps((s) => ({
            ...s,
            keyword: val.trim(),
            page: DEFAULT_PAGE,
            offset: DEFAULT_OFFSET,
          }))
        }
        showCancelButton
        onClear={() => setSearchProps((s) => ({ ...s, keyword: "" }))}
        placeholder="请输入内容"
        style={{
          "--border-radius": "100px",
          "--height": "32px",
          "--padding-left": "12px",
        }}
      />

      <Tabs
        defaultActiveKey={SearchTypes.Songs.toString()}
        onChange={(key: string) =>
          setSearchProps((s) => ({
            ...s,
            type: Number(key),
            page: DEFAULT_PAGE,
            offset: DEFAULT_OFFSET,
          }))
        }
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
                      setSearchProps((s) => ({
                        ...s,
                        page: s.page + 1,
                        offset: s.page * s.limit,
                      }))
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
