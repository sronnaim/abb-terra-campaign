import { cn } from "@/lib/utils";

export function ABBCursor({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div {...props} className={cn("text-primary", className)} aria-hidden>
      —
    </div>
  );
}
