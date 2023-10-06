import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"


const inputVariants = cva(
  "flex h-10 w-full rounded-md bg-background text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
     mode: {
        default: "px-3 py-2 border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        editMode: //bg-red-600
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        readOnlyMode:
        "px-3 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 ",
      },
    },
    defaultVariants: {
      mode: "default",
    },
  }
)



export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,    
  VariantProps<typeof inputVariants> {
    asChild?: boolean
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, mode, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ mode, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
