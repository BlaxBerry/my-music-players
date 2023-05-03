import React from "react"
import { NavBar, Popup } from "antd-mobile"

interface CustomizedPopupProps {
  children: React.ReactNode
  showPopup: boolean
  setShowPopup: (s: boolean) => void
  width?: React.CSSProperties["width"]
}

export default React.memo<CustomizedPopupProps>(function CustomizedPopup({
  showPopup = false,
  setShowPopup,
  children,
  width,
}) {
  return (
    <Popup
      visible={showPopup}
      showCloseButton
      onClose={() => setShowPopup(false)}
      onMaskClick={() => setShowPopup(false)}
      position="left"
      bodyStyle={{ width: width || "100%" }}
    >
      <React.Suspense fallback={<div>Loading...</div>}>
        <NavBar backArrow={null}>
          <div>搜索</div>
        </NavBar>
        {children}
      </React.Suspense>
    </Popup>
  )
})
