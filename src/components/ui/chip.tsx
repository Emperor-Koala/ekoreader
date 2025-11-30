import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

function Chip({children, className}: ComponentProps<"p">) {
    return (
        <p className={cn("px-4 py-0 border rounded-sm", className)}>{children}</p>
    );
}

export { Chip };