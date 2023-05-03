import { Artist } from "./__Artist"

export type MV = {
  id: number
  name: string
  cover: string
  artistName: string
  artists: Array<Artist>
  artistId: number
  duration: number
  playCount: number
}
