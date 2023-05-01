import React from "react"
import { useNavigate } from "react-router-dom"
import { Badge, NavBar, SafeArea, TabBar } from "antd-mobile"
import {
  SearchOutline,
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons"
import { ProviderProps } from "interfaces/__components/props"

export default React.memo(function TemplateProvider({
  children,
}: ProviderProps) {
  const navigate = useNavigate()

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
          back={"返回"}
          onBack={() => navigate(-1)}
          right={
            <div style={{ fontSize: 24 }} onClick={() => navigate("/search")}>
              <SearchOutline />
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
    </div>
  )
})
