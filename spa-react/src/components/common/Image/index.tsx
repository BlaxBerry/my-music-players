import React from "react"
import { Image, ImageProps } from "antd-mobile"
import { formatDuration } from "utils/helpers/format"

interface CustomizedImageProps extends ImageProps {
  title?: string
  artists?: string
  duration?: number
  playCount?: number
  playIcon?: boolean | React.ReactNode
  // playIconPosition?: "bottom-left" | "bottom-right"
}

export default React.memo<CustomizedImageProps>(function CustomizedImage(
  props
) {
  const { title, artists, duration, playCount } = props

  const hasMask = title || artists || playCount || duration

  return (
    <div className="my-image-wrap">
      <Image {...props} lazy />

      {hasMask && (
        <div className="mask">
          <div className="mask-names">
            {title && <h2 className="title">{title}</h2>}
            {artists && <h3 className="artists">{artists}</h3>}
            {playCount && (
              <p className="palycount">
                播放次数：{playCount.toLocaleString()}
              </p>
            )}
          </div>

          {duration && (
            <h3 className="mask-duration">{formatDuration(duration)}</h3>
          )}
        </div>
      )}
    </div>
  )
})
