import React from "react"
import { DotLoading, Mask } from "antd-mobile"

export default React.memo(function LoadingMask() {
  return (
    <Mask
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>
        拼命加载中 <DotLoading />
      </h2>
    </Mask>
  )
})
