import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  // Flat fill, 1px border, normal weight, no transitions.
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-normal whitespace-nowrap select-none outline-none focus-visible:ring-4 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-65 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:border-primary-hover hover:bg-primary-hover",
        // Warm accent: one per screen at most.
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:border-secondary-hover hover:bg-secondary-hover",
        // Plain paper button for everything that isn't the main action.
        outline: "border-input bg-card text-foreground hover:bg-muted",
        destructive: "border-destructive bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/25",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-link underline hover:text-link-hover",
      },
      size: {
        default: "h-[38px] px-3",
        xs: "h-6 gap-1 rounded-sm px-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-[31px] gap-1.5 rounded-sm px-2 text-xs",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "size-[38px]",
        "icon-xs": "size-6 rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-[31px] rounded-sm",
        "icon-lg": "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
