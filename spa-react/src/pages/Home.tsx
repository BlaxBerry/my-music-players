import React, { useEffect } from "react"
import { ContextSong } from "components/porviders/StateProvider"
import MusicPlayer from "components/MusicPlayer"
import Image from "components/common/Image"
import PalyerStyles from "styles/customized/player.module.scss"
import { formatDuration } from "utils/helpers/format"
import { Artist } from "interfaces/__apis/search/__Artist"

export default function Home() {
  const { song, setSong } = React.useContext(ContextSong)

  useEffect(() => {
    if (song?.id) updateContextSong(song.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song?.id])

  const updateContextSong = (songID: number | string) => {
    Promise.all([getDetail(songID), getSrc(songID), getLyric(songID)]).then(
      ([detail, src, lyric]) => {
        setSong((s) => ({
          id: s.id,
          name: detail.songs[0].name,
          url: detail.songs[0].al.picUrl,
          album: detail.songs[0].al,
          artists: detail.songs[0].ar?.map((a: Artist) => ({
            id: a.id,
            name: a.name,
          })),
          src: src.data[0].url,
          duration: formatDuration(src.data[0].time),
          lyric: lyric.lrc.lyric
            .split("[")
            .map((l: string) => l.split("]"))
            .slice(1),
        }))
      }
    )
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 1rem",
        marginTop: 100,
      }}
    >
      <h2>{song?.name ?? "歌曲名"}</h2>
      <h3>{song?.artists?.map((artist) => artist.name).join() ?? "歌手名"}</h3>

      <Image
        src={song?.url}
        width={240}
        height={240}
        style={{ borderRadius: 120, marginTop: "1rem" }}
        className={song?.url ? PalyerStyles.movement_playing : ""}
      />

      <MusicPlayer song={song} autoplay />
    </div>
  )
}

const getDetail = async (songID: number | string) => {
  const res = await fetch(`https://autumnfish.cn/song/detail?ids=${songID}`)
  return await res.json()
}
const getSrc = async (songID: number | string) => {
  const response = await fetch(`https://autumnfish.cn/song/url?id=${songID}`)
  return await response.json()
}
const getLyric = async (songID: number | string) => {
  const res = await fetch(`https://autumnfish.cn/lyric?id=${songID}`)
  return await res.json()
}
