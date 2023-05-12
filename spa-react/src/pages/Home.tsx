import React, { useEffect } from "react"
import { ContextSong } from "components/porviders/StateProvider"
import Image from "components/common/Image"
import PalyerStyles from "styles/customized/player.module.scss"

export default function Home() {
  const { song } = React.useContext(ContextSong)

  useEffect(() => {
    if (!song?.id) return
    fetch(`https://autumnfish.cn/lyric?id=${song.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.lrc.lyric)
      })
  }, [song?.id])

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{song?.name}</h1>
        <h2>{song?.artists?.map((artist) => artist.name).join()}</h2>
        <audio autoPlay src={song?.src} loop />

        <Image
          src={song?.url}
          width={240}
          height={240}
          style={{ borderRadius: 120, marginTop: "1rem" }}
          className={song.url ? PalyerStyles.movement_playing:''}
        />
      </div>
    </>
  )
}
