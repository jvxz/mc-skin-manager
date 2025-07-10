'use client'
import { IconUpload } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { useSkinUpload } from '@/hooks/use-skin-upload'
import { Button } from './ui/button'
import { Input } from './ui/input'

function SkinImportForm({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void
}) {
  const { uploadSkin } = useSkinUpload()
  const form = useForm({
    defaultValues: {
      file: null as File | null,
      text: '',
    },
    onSubmit: ({ value }) => {
      form.reset()
      setIsOpen(false)
      if (value.file) {
        uploadSkin(value.file)
      } else {
        uploadSkin(value.text)
      }
    },
  })

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault()
        form.handleSubmit()
      }}>
      <form.Field name="text">
        {f => (
          <Input
            placeholder="Username, URL, or UUID..."
            onChange={e => f.handleChange(e.target.value)}
            onBlur={f.handleBlur}
            value={f.state.value}
          />
        )}
      </form.Field>
      <div className="flex w-full items-center gap-2">
        <Button asChild variant="outline" className="mr-auto">
          <label htmlFor="file">
            <form.Field name="file">
              {f => (
                <input
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
            Upload <IconUpload />
          </label>
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}

export { SkinImportForm }
