export default function fetchData(url: string, method?: string) {
  return fetch(url, {
    credentials: "include",
    headers: {},
    method: method || "GET",
  })
}
