import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-red-200 bg-red-100 text-red-700 hover:bg-red-100/80",
                outline: "text-foreground",
                success:
                    "border-green-200 bg-green-100 text-green-700 hover:bg-green-100/80",
                warning:
                    "border-yellow-200 bg-yellow-100 text-yellow-700 hover:bg-yellow-100/80",
                pending:
                    "border-orange-200 bg-orange-100 text-orange-700 hover:bg-orange-100/80",
                banned:
                    "border-red-200 bg-red-100 text-red-700 hover:bg-red-100/80",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
