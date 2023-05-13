import React, { useCallback, useRef, useState } from "react"
import { Button, DotLoading, Slider, Space } from "antd-mobile"
import { PlayOutline, LeftOutline, RightOutline } from "antd-mobile-icons"
// import { SliderValue } from "antd-mobile/es/components/slider"
import { Song } from "interfaces/__apis/search/__Song"

interface MusicPlayerProps {
  song: Partial<Song>
  autoplay: boolean
}

export default React.memo(function MusicPlayer({
  song,
  autoplay = false,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay)

  const refAudio = useRef<HTMLAudioElement>(null)
  const onPlay = useCallback(() => refAudio?.current?.play(), [])
  const onPause = useCallback(() => refAudio?.current?.pause(), [])

  if (!song?.src) return null
  return (
    <div
      style={{
        width: 390,
        position: "fixed",
        bottom: 100,
        padding: "1rem",
      }}
    >
      {/* Original Audio Element */}
      <audio
        ref={refAudio}
        src={song.src}
        autoPlay={autoplay}
        loop
        // onTimeUpdate={() => {
        //   if (!refAudio.current) return
        //   console.log(refAudio.current.currentTime);
        //   // if (player.currentTime - player._startTime >= player.value) {
        //   //   player.pause();
        //   // }
        // }}
      />

      {/* Druation Sider */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        xx:xx
        <div style={{ flex: 1, padding: "1rem 0.5rem" }}>
          <Slider
          // onAfterChange={(sliderValue: SliderValue) => {
          //   console.log(sliderValue)
          // }}
          />
        </div>
        <span>{song.duration}</span>
      </div>

      {/* Action Button Groups */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* 1. left buttons */}
        <div></div>

        {/* 2. play buttons */}
        <Space>
          {/* 2.1. previous */}
          <Button
            color="primary"
            shape="rounded"
            fill={"outline"}
            style={{ visibility: "hidden" }}
          >
            <LeftOutline />
          </Button>
          {/* 2.2. play */}
          <Button
            color="primary"
            shape="rounded"
            fill={isPlaying ? "outline" : "solid"}
            onClick={() => {
              isPlaying ? onPause() : onPlay()
              setIsPlaying((s) => !s)
            }}
          >
            {isPlaying ? <DotLoading color="primary" /> : <PlayOutline />}
          </Button>
          {/* 2.3. next */}
          <Button
            color="primary"
            shape="rounded"
            fill={"outline"}
            style={{ visibility: "hidden" }}
          >
            <RightOutline />
          </Button>
        </Space>

        {/* 3. right buttons */}
        <div></div>
      </div>
    </div>
  )
})
