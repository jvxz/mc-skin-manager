'use client'
import {
  IconArrowRight,
  IconFileImport,
  IconSortDescending,
} from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { useSkin } from '@/hooks/use-skin'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { sortByAtom } from './list'

function SkinListHeader() {
  const shouldPaste = useRef(false)
  const { postSkin, isMutating } = useSkin()
  const [sortBy, setSortBy] = useAtom(sortByAtom)

  const form = useForm({
    defaultValues: {
      file: null as File | null,
      text: '',
    },
    onSubmit: ({ value }) => {
      if (value.file) {
        postSkin(value.file)
        return form.reset()
      }

      if (value.text) {
        postSkin(value.text)
        return form.reset()
      }
    },
  })

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData || isMutating || shouldPaste.current) return

      const text = e.clipboardData.getData('text')
      if (text) {
        form.setFieldValue('text', text)
        form.handleSubmit()
      }
    }

    window.addEventListener('paste', handlePaste)

    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [form.setFieldValue, form.handleSubmit, isMutating])

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (isMutating) return
        form.handleSubmit()
      }}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <form.Field name="text">
            {field => (
              <Input
                disabled={isMutating}
                data-1p-ignore
                className="peer pe-9"
                placeholder="Username, UUID, URL, or NameMC"
                type="text"
                onChange={e => field.handleChange(e.target.value)}
                onFocus={() => {
                  shouldPaste.current = false
                }}
                onBlur={() => {
                  shouldPaste.current = true
                }}
                value={field.state.value}
              />
            )}
          </form.Field>
          {/* <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <IconShirt size={16} aria-hidden="true" />
          </div> */}
          <Button
            variant="ghost"
            size="icon"
            className="-translate-y-1/2 absolute end-1.5 top-1/2 flex size-6 items-center justify-center rounded-full text-muted-foreground/80 peer-disabled:opacity-50">
            <IconArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
        <Button
          disabled={isMutating}
          asChild
          size="icon"
          variant="soft"
          className="size-8">
          <label htmlFor="file">
            <form.Field name="file">
              {f => (
                <input
                  disabled={isMutating}
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    f.handleChange(file)
                    form.handleSubmit()
                  }}
                />
              )}
            </form.Field>
            <IconFileImport />
          </label>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="soft" size="icon">
              <IconSortDescending />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={7}>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortBy}
              onValueChange={value => {
                setSortBy(value as 'newest' | 'oldest' | 'a-z' | 'z-a')
              }}>
              <DropdownMenuRadioItem value="newest">
                Newest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">
                Oldest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="a-z">A-Z</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="z-a">Z-A</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </form>
  )
}

export { SkinListHeader }
