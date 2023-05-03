import { Album } from "./__Album"
import { Artist } from "./__Artist"

export type Song = {
  name: string
  fee: number
  mvid: number
  id: number
  duration: number
  album: Album
  artists: Array<Artist>
}
