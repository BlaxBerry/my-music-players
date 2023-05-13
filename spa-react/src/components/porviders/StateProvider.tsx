import React, { useState } from "react"
import { ProviderProps } from "interfaces/__components/props"
import { Song } from "interfaces/__apis/search/__Song"

export const ContextThemeModel = React.createContext<{
  themeModel: string
  setThemeModel: React.Dispatch<React.SetStateAction<string>>
}>({
  themeModel: "",
  setThemeModel: () => {
    /* */
  },
})

export const ContextSong = React.createContext<{
  song: Partial<Song>
  setSong: React.Dispatch<React.SetStateAction<Partial<Song>>>
}>({
  song: {},
  setSong: () => {
    /* */
  },
})

export default React.memo(function StateProvider({ children }: ProviderProps) {
  const [themeModel, setThemeModel] = useState("")
  const [song, setSong] = useState<Partial<Song>>({})

  return (
    <>
      <ContextThemeModel.Provider value={{ themeModel, setThemeModel }}>
        <ContextSong.Provider value={{ song, setSong }}>
          {children}
        </ContextSong.Provider>
      </ContextThemeModel.Provider>
    </>
  )
})
