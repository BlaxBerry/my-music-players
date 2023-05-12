import { Album } from "./__Album"
import { Artist } from "./__Artist"

export type Song = {
  id: number
  name: string
  publishTime?: number
  url?: string // image url
  src?: string // song url
  mvid: number
  duration: number | string
  album: Album
  artists: Array<Artist>
}
