import { useCallback, useMemo, useState } from "react"
import React from "react"
import {
  List,
  SearchBar,
  Tabs,
  Ellipsis,
  Badge,
  SpinLoading,
  Grid,
  ErrorBlock,
} from "antd-mobile"
import Image from "components/common/Image"
import useRequestSearch, {
  SEARCH_TYPES,
} from "hooks/useRequest/useRequestSearch"
import { SearchResult } from "interfaces/__apis/search"
import { getSourceFromAssets } from "utils/helpers/source"
import { toEllipsisNumber99 } from "utils/helpers/format"

type SearchTabs = Array<{ title: string; key: number; content: JSX.Element }>

const defaultAvatar = getSourceFromAssets("images/avatar.png")

export default React.memo(function Search() {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selectedType, setSelectedType] = useState<number>(SEARCH_TYPES.SONGS)

  const { data, loading, error } = useRequestSearch({
    keyword: searchValue,
    type: Number(selectedType),
  })

  console.log({ data, loading, error }, searchValue, selectedType)

  const tabs = useMemo<SearchTabs>(
    () => [
      {
        title: "歌曲",
        key: SEARCH_TYPES.SONGS,
        content: <SongsList loading={loading} data={data?.result?.songs} />,
      },
      {
        title: "专辑",
        key: SEARCH_TYPES.ALBUMS,
        content: <AlbumsList loading={loading} data={data?.result?.albums} />,
      },
      {
        title: "MV",
        key: SEARCH_TYPES.MVS,
        content: <MVsList loading={loading} data={data?.result?.mvs} />,
      },
      {
        title: "视频",
        key: SEARCH_TYPES.VIDEOS,
        content: <VideosList loading={loading} data={data?.result?.videos} />,
      },
    ],
    [data, loading]
  )

  const getDataTotal = useCallback(
    (currentTab: number): React.ReactNode => {
      // 1.
      if (currentTab !== selectedType) null
      else {
        // 2.
        if (loading) return <SpinLoading style={{ width: 15, height: 15 }} />
        // 3.
        else {
          const amount = (() => {
            const dataSrouce = data?.result
            if (dataSrouce?.songCount) return dataSrouce["songCount"]
            else if (dataSrouce?.albumCount) return dataSrouce["albumCount"]
            else if (dataSrouce?.mvCount) return dataSrouce["mvCount"]
            else if (dataSrouce?.videoCount) return dataSrouce["videoCount"]
          })()
          return amount && toEllipsisNumber99(amount)
        }
      }
    },
    [data?.result, loading, selectedType]
  )

  return (
    <>
      <SearchBar
        onSearch={(val: string) => setSearchValue(val.trim())}
        onChange={(val: string) =>
          searchValue && val.trim() === "" && setSearchValue("")
        }
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
          <Tabs.Tab
            key={key}
            title={
              <Badge
                content={getDataTotal(key)}
                children={title}
                color={"transparent"}
              />
            }
          >
            {loading && <p>拼命搜索中...</p>}

            <div style={{ height: "100vh", overflowY: "scroll" }}>
              {content}
            </div>
          </Tabs.Tab>
        ))}
      </Tabs>
    </>
  )
})

const SongsList = React.memo(function ({
  loading,
  data,
}: {
  loading: boolean
  data: SearchResult["result"]["songs"]
}) {
  if (!loading && !data?.length) return <ErrorBlock status="empty" fullPage />
  return (
    <List>
      {data?.map((item) => (
        <List.Item
          key={item.id}
          children={<Ellipsis direction="end" content={item.name} />}
          description={
            <Ellipsis
              direction="end"
              content={item.artists.map((artist) => artist.name).join()}
            />
          }
          prefix={
            <Image
              src={defaultAvatar}
              style={{ borderRadius: 20 }}
              fit="cover"
              width={40}
              height={40}
            />
          }
        />
      ))}
    </List>
  )
})

const AlbumsList = React.memo(function ({
  loading,
  data,
}: {
  loading: boolean
  data: SearchResult["result"]["albums"]
}) {
  if (!loading && !data?.length) return <ErrorBlock status="empty" fullPage />
  return (
    <Grid columns={2} gap={4}>
      {data?.map((item) => (
        <Grid.Item key={item.id}>
          {/* <Card onClick={() => { }}> */}
          <Image src={item.blurPicUrl} width={180} height={180} fit="cover" />
          {/* </Card> */}
        </Grid.Item>
      ))}
    </Grid>
  )
})

const MVsList = React.memo(function ({
  loading,
  data,
}: {
  loading: boolean
  data: SearchResult["result"]["mvs"]
}) {
  if (!loading && !data?.length) return <ErrorBlock status="empty" fullPage />
  return (
    <Grid columns={1} gap={5}>
      {data?.map((item) => (
        <Grid.Item key={item.id}>
          <Image
            src={item.cover}
            width={360}
            height={200}
            fit="cover"
            title={item.name}
            artists={item.artists.map((artist) => artist.name).join()}
            duration={item.duration}
            playCount={item.playCount}
          />
        </Grid.Item>
      ))}
    </Grid>
  )
})

const VideosList = React.memo(function ({
  loading,
  data,
}: {
  loading: boolean
  data: SearchResult["result"]["videos"]
}) {
  if (!loading && !data?.length) return <ErrorBlock status="empty" fullPage />
  return (
    <Grid columns={1} gap={5}>
      {data?.map((item) => (
        <Grid.Item key={item.vid}>
          <Image src={item.coverUrl} width={360} height={200} fit="cover" />
        </Grid.Item>
      ))}
    </Grid>
  )
})
