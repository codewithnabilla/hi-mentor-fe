import type { Department, DepartmentPageLink } from "@/types/department.type";
import AppLoader from "../common/AppLoader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

interface DepartmentTableProps {
  departments: Department[]
  loading?: boolean;
  links?: DepartmentPageLink[]
  currentPage?: number
  onPageChange?: (page: number) => void
  onEdit: (department: Department) => void
  onDelete: (department: Department) => void
  canUpdate: boolean
  canDelete: boolean
}

const normalizeLabel = (label: string) =>
  label
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»");

export default function DepartmentTable({
  departments,
  loading = false,
  links = [],
  currentPage = 1,
  onPageChange,
  onEdit,
  onDelete,
  canUpdate,
  canDelete
}: DepartmentTableProps) {
  if (loading) {
    return <AppLoader label="Loading departments..." />;
  }

  if (departments.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No department found.</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[60px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {departments.map((department) => (
            <TableRow key={department.uuid}>
              <TableCell>{department.name}</TableCell>
              <TableCell>{department.code}</TableCell>
              <TableCell>{department.description}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {canUpdate && <DropdownMenuItem onClick={() => onEdit(department)}>Edit</DropdownMenuItem>}
                    {canDelete && <DropdownMenuItem className="text-destructive" onClick={() => onDelete(department)}>Delete</DropdownMenuItem>}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

      {links.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          {links.map((link, index) => {
            const isDisable = !link.url || !link.page

            return (
              <Button
                key={`${link.label}-${index}`}
                type="button"
                size="sm"
                variant={link.active ? "default" : "outline"}
                disabled={isDisable}
                onClick={() => {
                  if (link.page && onPageChange)
                    onPageChange(link.page)
                }}
              >
                {normalizeLabel(link.label)}
              </Button>
            )
          })}
        </div>
      )}

      {links.length === 0 && (
        <div className="mt-4 text-right text-sm text-muted-foreground">
          Page {currentPage}
        </div>
      )}
    </>
  )

}