import { SEARCH_TYPES } from "hooks/useRequest/useSearch"
import { Album } from "./__Album"
import { Artist } from "./__Artist"
import { MV } from "./__MV"
import { Song } from "./__Song"
import { Video } from "./__Video"

export type SearchParamsType = ValueOfData<typeof SEARCH_TYPES>

export type SearchResult = {
  code: number
  result: Partial<
    SongsResult & AlbumsResult & MVsResult & VideosResult & ArtistsResult
  >
}

type SongsResult = {
  hasMore: boolean
  songCount: number
  songs: Array<Song>
}

type AlbumsResult = {
  albumCount: number
  albums: Array<Album>
}

type MVsResult = {
  mvCount: number
  mvs: Array<MV>
}

type VideosResult = {
  hasMore: boolean
  videoCount: number
  videos: Array<Video>
}

type ArtistsResult = {
  hasMore: boolean
  artistCount: number
  artists: Array<Artist>
}
