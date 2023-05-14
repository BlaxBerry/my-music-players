import React from "react"
import { Ellipsis, Grid, List } from "antd-mobile"
import { EmptyResult } from "components/common/Results"
import Image from "components/common/Image"
import LoadingMask from "components/common/Loading/LoadingMask"
import { ContextSong } from "components/porviders/StateProvider"
import { Song } from "interfaces/__apis/search/__Song"
import { formatDuration } from "utils/helpers/format"
import { Album } from "interfaces/__apis/search/__Album"
import { MV } from "interfaces/__apis/search/__MV"
import { Video } from "interfaces/__apis/search/__Video"
import { Artist } from "interfaces/__apis/search/__Artist"

export const SongsList = React.memo<{
  data: Song[] | null
  loading: boolean
}>(({ data, loading }) => {
  const { setSong } = React.useContext(ContextSong)

  const onCick = (item: Song) => {
    setSong({ id: item.id })
  }

  if (loading) return <LoadingMask />
  if (!loading && !data?.length) return <EmptyResult />
  return (
    <List>
      {data?.map((item) => (
        <List.Item
          key={item.id}
          arrow={null}
          children={<Ellipsis direction="end" content={item.name} />}
          description={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Ellipsis
                direction="end"
                content={item.artists.map((artist) => artist.name).join()}
              />
              <span>{formatDuration(item.duration)}</span>
            </div>
          }
          prefix={
            <Image
              src={item.url}
              style={{ borderRadius: 20 }}
              fit="cover"
              width={40}
              height={40}
            />
          }
          onClick={() => onCick(item)}
        />
      ))}
    </List>
  )
})

export const AlbumsList = React.memo<{
  data: Album[]
  loading: boolean
}>(({ data, loading }) => {
  if (loading) return <LoadingMask />
  if (!data?.length) return <EmptyResult />
  return (
    <Grid columns={2} gap={4}>
      {data?.map((item) => (
        <Grid.Item key={item.id}>
          <Image
            src={item.blurPicUrl}
            width={180}
            height={180}
            fit="cover"
            title={item.name}
            artists={item.artists.map((artist) => artist.name).join()}
          />
        </Grid.Item>
      ))}
    </Grid>
  )
})

export const MVsList = React.memo<{
  data: MV[]
  loading: boolean
}>(({ data, loading }) => {
  if (loading) return <LoadingMask />
  if (!data?.length) return <EmptyResult />
  return (
    <Grid columns={1} gap={5}>
      {data?.map((item) => (
        <Grid.Item key={item.id}>
          <Image
            src={item.cover}
            width={366}
            height={200}
            fit="cover"
            title={item.name}
            artists={item.artists.map((artist) => artist.name).join()}
            duration={item.duration}
          />
        </Grid.Item>
      ))}
    </Grid>
  )
})

export const VideosList = React.memo<{
  data: Video[]
  loading: boolean
}>(({ data, loading }) => {
  if (loading) return <LoadingMask />
  if (!data?.length) return <EmptyResult />
  return (
    <Grid columns={1} gap={5}>
      {data?.map((item) => (
        <Grid.Item key={item.vid}>
          <Image
            src={item.coverUrl}
            width={366}
            height={200}
            fit="cover"
            title={item.title}
            duration={item.durationms}
            playCount={item.playTime}
          />
        </Grid.Item>
      ))}
    </Grid>
  )
})

export const ArtistsList = React.memo<{
  data: Artist[]
  loading: boolean
}>(({ data, loading }) => {
  if (loading) return <LoadingMask />
  if (!data?.length) return <EmptyResult />
  return (
    <Grid columns={1} gap={20}>
      {data.map((item) => (
        <Grid.Item
          key={item.id}
          style={{
            display: "flex",
          }}
        >
          <Image
            src={item.picUrl}
            width={100}
            height={100}
            style={{ borderRadius: 50 }}
            fit="cover"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "1rem",
            }}
          >
            <h2 style={{ marginBottom: "0.5rem" }}>{item.name}</h2>
            <h4>专辑：{item.albumSize}</h4>
            <h4>MV：{item.mvSize}</h4>
          </div>
        </Grid.Item>
      ))}
    </Grid>
  )
})
