import type { Skill } from "@/types/skill.type";
import type { PageLink } from "@/types/pagination.type";
import { MoreHorizontal } from "lucide-react";
import AppLoader from "../common/AppLoader";
import MasterTablePagination from "../common/MasterTablePagination";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface SkillTableProps {
  skills: Skill[];
  loading?: boolean;
  links?: PageLink[];
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
  canUpdate: boolean;
  canDelete: boolean;
}

export default function SkillTable({ skills, loading = false, links = [], currentPage = 1, onPageChange, onEdit, onDelete, canUpdate, canDelete }: SkillTableProps) {
  if (loading) return <AppLoader label="Loading skills..." />;
  if (skills.length === 0) return <div className="py-8 text-center text-muted-foreground">No skill found.</div>;

  return (
    <>
      <Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Code</TableHead><TableHead>Description</TableHead><TableHead className="w-[60px]" /></TableRow></TableHeader>
        <TableBody>
          {skills.map((skill) => (
            <TableRow key={skill.uuid}>
              <TableCell>{skill.name}</TableCell>
              <TableCell>{skill.code}</TableCell>
              <TableCell>{skill.description ?? "-"}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label={`Actions for ${skill.name}`}><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {canUpdate && <DropdownMenuItem onClick={() => onEdit(skill)}>Edit</DropdownMenuItem>}
                    {canDelete && <DropdownMenuItem className="text-destructive" onClick={() => onDelete(skill)}>Delete</DropdownMenuItem>}
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