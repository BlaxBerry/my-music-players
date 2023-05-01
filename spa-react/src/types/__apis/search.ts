export type SearchResult = {
  code: number
  result: {
    hasMore: boolean
    songCouunt: number
    songs: {
      name: string
      fee: number
      mvid: number
      id: number
      duration: number
      album: {
        id: number
        picId: number
        publishTime: number
        size: number
      }
      artiste: {
        id: number
        name: string
      }[]
    }[]
  }
}
