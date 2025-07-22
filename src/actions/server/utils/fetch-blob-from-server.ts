'use server'
export async function fetchBlobFromServer(url: string) {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`)
  }

  return await res.blob()
}
