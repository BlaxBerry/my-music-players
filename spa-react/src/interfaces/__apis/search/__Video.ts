export type Video = {
  vid: string
  title: string
  coverUrl: string
  durationms: number
  palyTime: number
  creator: [
    {
      userId: number
      userName: string
    }
  ]
}
