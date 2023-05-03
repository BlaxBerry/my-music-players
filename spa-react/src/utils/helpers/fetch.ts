interface FetchDataPrams<T, K> {
  url: string
  method?: string
  params?: unknown
  pending?: () => void
  resolved: (value: T) => void
  rejected?: (value: K) => void
}

export default async function fetchData<T, K = unknown>({
  url,
  method = "GET",
  params,
  pending,
  resolved,
  rejected,
}: FetchDataPrams<T, K>): Promise<void> {
  // 1.
  pending && pending()
  // 2.
  fetch(url, {
    credentials: "include",
    headers: {},
    method,
    body: JSON.stringify(params),
  })
    .then(async (response) => response.json())
    .then((data) => {
      if (data.code !== 200) rejected && rejected(data)
      else resolved && resolved(data)
    })
    .catch((error) => {
      rejected && rejected(error)
    })
}
