import { Artist } from "./__Artist"

export type Album = {
  id: number
  name: string
  picId: number
  picUrl?: string
  publishTime: number
  blurPicUrl: string
  size: number
  status: number
  company?: string
  copyrightId: number
  artists: Array<Artist>
  paid: boolean
  onSale: boolean
}
