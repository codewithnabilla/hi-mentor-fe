import type { PageLink } from "@/types/pagination.type"
import { Button } from "../ui/button"

interface MasterTablePaginationProps {
  links?: PageLink[]
  currentPage?: number
  onPageChange?: (page: number) => void
}

const normalizeLabel = (label: string) =>
  label
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")

export default function MasterTablePagination({
  links = [],
  currentPage = 1,
  onPageChange,
}: MasterTablePaginationProps) {
  if (links.length === 0) {
    return (
      <div className="mt-4 text-right text-sm text-muted-foreground">
        Page {currentPage}
      </div>
    )
  }

  return (
    <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
      {links.map((link, index) => {
        const isDisabled = !link.url || !link.page

        return (
          <Button
            key={`${link.label}-${index}`}
            type="button"
            size="sm"
            variant={link.active ? "default" : "outline"}
            disabled={isDisabled}
            onClick={() => {
              if (link.page && onPageChange) {
                onPageChange(link.page)
              }
            }}
          >
            {normalizeLabel(link.label)}
          </Button>
        )
      })}
    </div>
  )
}