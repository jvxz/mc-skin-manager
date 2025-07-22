'use client'
import { IconFileImport, IconShirt } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { useSkin } from '@/hooks/use-skin'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

function SkinListHeader() {
  const { postSkin, isMutating } = useSkin()
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
                className="peer ps-9"
                placeholder="Username, UUID, URL, or NameMC"
                type="text"
                onChange={e => field.handleChange(e.target.value)}
                value={field.state.value}
              />
            )}
          </form.Field>
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <IconShirt size={16} aria-hidden="true" />
          </div>
        </div>
        <Button
          disabled={isMutating}
          asChild
          size="icon"
          variant="outline"
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
        <Button isLoading={isMutating}>Import</Button>
      </div>
    </form>
  )
}

export { SkinListHeader }
