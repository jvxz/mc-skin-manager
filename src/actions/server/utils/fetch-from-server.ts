'use server'
export async function fetchFromServer(url: string) {
  return await fetch(url)
}
