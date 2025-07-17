'use client'
import { parseAsBoolean, useQueryState } from 'nuqs'

function useExpanded() {
  const [expanded, setExpanded] = useQueryState(
    'expanded',
    parseAsBoolean.withDefault(false),
  )

  return { expanded, setExpanded }
}

export { useExpanded }
