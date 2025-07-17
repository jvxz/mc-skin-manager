import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui'
import { cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { popoverStyles, staticStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button'

function NavigationMenu({
  className,
  children,
  viewport = true,
  delayDuration = 10,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
  delayDuration?: number
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      delayDuration={delayDuration}
      className={cn(
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className,
      )}
      {...props}>
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        'group flex flex-1 list-none items-center justify-center gap-1',
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva([
  buttonVariants({
    variant: 'ghost',
  }),
  'group',
])

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}>
      {children}
      <svg
        className="iconify ph--caret-down relative top-px ml-1 size-3"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        'data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out group-data-[viewport=true]/navigation-menu:data-[motion=from-end]:slide-in-from-right-52 group-data-[viewport=true]/navigation-menu:data-[motion=from-start]:slide-in-from-left-52 group-data-[viewport=true]/navigation-menu:data-[motion=to-end]:slide-out-to-right-52 group-data-[viewport=true]/navigation-menu:data-[motion=to-start]:slide-out-to-left-52 group-data-[viewport=false]/navigation-menu:fade-in-0 group-data-[viewport=false]/navigation-menu:slide-in-from-top-2 top-0 left-0 w-full p-2 pr-2.5 duration-100 ease-out data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:animate-in group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-card group-data-[viewport=false]/navigation-menu:text-card-foreground group-data-[viewport=false]/navigation-menu:duration-100 md:absolute md:w-auto',
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        'absolute top-full left-0 isolate z-50 flex justify-center',
      )}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          staticStyles.base,
          staticStyles.variant.default,
          'data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden text-popover-foreground duration-100 data-[state=open]:animate-in md:w-[var(--radix-navigation-menu-viewport-width)]',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        popoverStyles.item,
        'flex cursor-pointer flex-col items-start whitespace-normal p-2 outline-none transition-all',
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        'top-full z-[1] flex h-1.5 justify-center overflow-hidden',
        className,
      )}
      {...props}>
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
}
