import useRequestSearc from "hooks/useRequest/useRequestSearch"

export default function Search() {
  const { data, loading, error } = useRequestSearc({
    keyword: "Sia",
  })

  console.log({ data, loading, error })

  return (
    <div>
      search
      <div>{loading && "Loading..."}</div>
      <div>{data && data.result.songs.length}</div>
    </div>
  )
}
