export type Video = {
  vid: string
  title: string
  coverUrl: string
  durationms: number
  playTime: number
  creator: [
    {
      userId: number
      userName: string
    }
  ]
}
