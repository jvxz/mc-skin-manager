'use server'
import { getAuthData } from '../utils/get-auth-data'

export async function getSkins() {
  const authData = await getAuthData()

  return authData.user
}
