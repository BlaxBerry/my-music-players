import React, { useLayoutEffect, useMemo, useState } from "react"
import { ConfigProvider } from "antd-mobile"
import enUS from "antd-mobile/es/locales/en-US"
import jaJP from "antd-mobile/es/locales/ja-JP"
import zhCN from "antd-mobile/es/locales/zh-CN"
import { ProviderProps } from "interfaces/__components/props"
import Color from "styles/variables/__color.module.scss"

export default React.memo(function ThemeProvider({ children }: ProviderProps) {
  const [isDarkMode] = useState<boolean>(true)
  const [language] = useState<string | undefined>("zhCN")

  const localLanguage = useMemo<typeof zhCN>(() => {
    switch (language) {
      case "zhCN":
      case "zhTW":
      case "zhHK":
        return zhCN
      case "enUS":
        return enUS
      case "jaJP":
        return jaJP
      default:
        return zhCN
    }
  }, [language])

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-prefers-color-scheme",
      isDarkMode ? "dark" : "light"
    )
    const rootElement = document.getElementById("root")
    if (rootElement)
      rootElement.style.backgroundColor = isDarkMode
        ? Color.bg_dark
        : Color.bg_light
  }, [isDarkMode])

  return <ConfigProvider locale={localLanguage}>{children}</ConfigProvider>
})
