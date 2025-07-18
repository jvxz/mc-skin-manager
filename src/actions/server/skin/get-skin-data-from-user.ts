'use server'
import {
  getProfileFromUsername,
  getProfileFromUUID,
  type MinecraftProfile,
} from 'minecraft-api-wrapper'
import { z } from 'zod'
import { getProperCasing } from '../utils/get-proper-casing'

export async function getSkinDataFromUser(input: string) {
  let profile: MinecraftProfile | null = null

  if (z.uuid().safeParse(input).success) {
    profile = await getProfileFromUUID(input)
  } else {
    profile = await getProfileFromUsername(input)
  }

  if (!profile) {
    throw new Error('User not found. Did you provide a valid username or UUID?')
  }
  const skinUrl = await profile.getSkinUrl()

  if (!skinUrl) {
    throw new Error('User has no skin')
  }

  const res = await fetch(skinUrl)
  const skinBlob = await res.blob()
  const skinType = await profile.getModel()

  const name = await getProperCasing(profile)

  return {
    name,
    skinBlob,
    skinType,
    uuid: profile.getUUID(),
  }
}
