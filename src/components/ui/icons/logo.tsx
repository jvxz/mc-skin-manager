import type { SVGProps } from 'react'

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      {/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}
      <title>Reskin</title>
      <path
        fill="currentColor"
        d="M16 21H8a1 1 0 0 1-1-1v-7.93l-1.3 1a.996.996 0 0 1-1.41 0l-2.83-2.78a.996.996 0 0 1 0-1.41L7.34 3H9c0 1.1 1.34 2 3 2s3-.9 3-2h1.66l5.88 5.88c.39.39.39 1.02 0 1.41l-2.83 2.83c-.39.38-1.02.38-1.41 0l-1.3-1V20a1 1 0 0 1-1 1"
      />
    </svg>
  )
}
