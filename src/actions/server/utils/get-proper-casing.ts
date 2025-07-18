'use server'
import type { MinecraftProfile } from 'minecraft-api-wrapper'
import z from 'zod'

export async function getProperCasing(profile: MinecraftProfile) {
  const res = await fetch(
    `https://api.minecraftservices.com/minecraft/profile/lookup/${profile.getUUID()}`,
  )

  const data = await res.json()

  const validated = z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .safeParse(data)

  if (!validated.success) {
    throw new Error('Invalid response from API')
  }

  return validated.data.name
}
