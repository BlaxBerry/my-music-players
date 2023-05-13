import React, { useEffect, useState } from "react"
import { ContextSong } from "components/porviders/StateProvider"
import MusicPlayer from "components/MusicPlayer"
import Image from "components/common/Image"
import PalyerStyles from "styles/customized/player.module.scss"

export default function Home() {
  const { song } = React.useContext(ContextSong)

  const [lyrics, setLyrics] = useState<Array<[string, string]>>()
  console.log(lyrics)

  useEffect(() => {
    if (!song?.id) return
    fetch(`https://autumnfish.cn/lyric?id=${song.id}`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.lrc.lyric.split("[").map((l: string) => l.split("]"))
        list.shift()
        setLyrics(list)
      })
  }, [song?.id])

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
