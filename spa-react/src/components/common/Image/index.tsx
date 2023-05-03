import React from "react"
import { Ellipsis, Image, ImageProps } from "antd-mobile"

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
  const { title, artists, playCount } = props

  return (
    <div className="my-image-wrap">
      <Image {...props} />

      <div className="mask">
        {title && (
          <h2>
            <Ellipsis direction="end" content={title} />
          </h2>
        )}
        {artists && <h3>{artists}</h3>}
        {/* {duration && <h3>{formatDuration(duration)}</h3>} */}
        <br />
        {playCount && <p>{playCount}</p>}
      </div>
    </div>
  )
})
