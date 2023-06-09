import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
import { Badge, NavBar, SafeArea, TabBar } from "antd-mobile"
import {
  SearchOutline,
  MoreOutline,
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons"
import CustomizedPopup from "components/common/Popup"
import { ProviderProps } from "interfaces/__components/props"

const SearchContent = React.lazy(() => import("pages/Search"))

export default React.memo(function TemplateProvider({
  children,
}: ProviderProps) {
  // const navigate = useNavigate()

  const [showSearchPopup, setShowSearchPopup] = useState<boolean>(false)

  const tabs = [
    {
      key: "home",
      title: "首页",
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: "todo",
      title: "待办",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
    {
      key: "message",
      title: "消息",
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: "99+",
    },
    {
      key: "personalCenter",
      title: "我的",
      icon: <UserOutline />,
    },
  ]

  return (
    <div>
      {/* 顶部安全区 */}
      <div style={{ background: "#ace0ff" }}>
        <SafeArea position="top" />
      </div>

      <div>
        {/* 顶部导航栏 */}
        <NavBar
          backArrow={
            <div
              style={{ fontSize: 24 }}
              onClick={() => setShowSearchPopup(true)}
            >
              <SearchOutline />
            </div>
          }
          right={
            <div style={{ fontSize: 24 }}>
              <MoreOutline />
            </div>
          }
        >
          <div>Music Player 标题</div>
        </NavBar>

        {/* 页面内容 */}
        {children}

        {/* 底部导航栏 */}
        <TabBar safeArea>
          {tabs.map((item) => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              badge={item.badge}
            />
          ))}
        </TabBar>
      </div>

      {/* 
      <div style={{ background: "#ffcfac" }}>
        <SafeArea position="bottom" />
      </div> 
      */}

      {/* 左侧搜索弹出层 */}
      <CustomizedPopup
        showPopup={showSearchPopup}
        setShowPopup={setShowSearchPopup}
      >
        <SearchContent />
      </CustomizedPopup>
    </div>
  )
})
