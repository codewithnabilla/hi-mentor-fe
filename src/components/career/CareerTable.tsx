import type { Career } from "@/types/career.type";
import type { PageLink } from "@/types/pagination.type";
import { MoreHorizontal } from "lucide-react";
import AppLoader from "../common/AppLoader";
import MasterTablePagination from "../common/MasterTablePagination";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface CareerTableProps {
  careers: Career[];
  loading?: boolean;
  links?: PageLink[];
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onEdit: (career: Career) => void;
  onDelete: (career: Career) => void;
  canUpdate: boolean;
  canDelete: boolean;
}

export default function CareerTable({ careers, loading = false, links = [], currentPage = 1, onPageChange, onEdit, onDelete, canUpdate, canDelete }: CareerTableProps) {
  if (loading) return <AppLoader label="Loading careers..." />;
  if (careers.length === 0) return <div className="py-8 text-center text-muted-foreground">No career found.</div>;

  return (
    <>
      <Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Code</TableHead><TableHead>Description</TableHead><TableHead className="w-[60px]" /></TableRow></TableHeader>
        <TableBody>
          {careers.map((career) => (
            <TableRow key={career.uuid}>
              <TableCell>{career.name}</TableCell>
              <TableCell>{career.code}</TableCell>
              <TableCell>{career.description ?? "-"}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label={`Actions for ${career.name}`}><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {canUpdate && <DropdownMenuItem onClick={() => onEdit(career)}>Edit</DropdownMenuItem>}
                    {canDelete && <DropdownMenuItem className="text-destructive" onClick={() => onDelete(career)}>Delete</DropdownMenuItem>}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MasterTablePagination links={links} currentPage={currentPage} onPageChange={onPageChange} />
    </>
  );
}