import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function Tag({ tag }: { tag: string }) {
  return (
    <Link href={`/tags/${encodeURIComponent(tag)}`}>
      <Badge variant="secondary" className="transition-colors hover:bg-primary hover:text-primary-foreground">
        {tag}
      </Badge>
    </Link>
  )
}
