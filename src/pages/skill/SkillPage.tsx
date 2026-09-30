import MasterPageHeader from "@/components/common/MasterPageHeader";
import SkillForm from "@/components/skill/SkillForm";
import SkillTable from "@/components/skill/SkillTable";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCan } from "@/hooks/useAuthorization";
import { useDeleteSkill, useSkills } from "@/hooks/useSkill";
import { useMasterTable } from "@/hooks/useMasterTable";
import type { Skill } from "@/types/skill.type";
import { useState } from "react";

export default function SkillPage() {
  const { page, search, searchInput, setSearchInput, handleSearch, handlePageChange } = useMasterTable();
  const { data, isLoading } = useSkills(page, search);
  const deleteSkill = useDeleteSkill();
  const can = useCan();
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>();

  const handleCreate = () => { setSelectedSkill(undefined); setOpen(true); };
  const handleEdit = (skill: Skill) => { setSelectedSkill(skill); setOpen(true); };
  const handleDelete = (skill: Skill) => {
    if (confirm(`Delete "${skill.name}"?`)) deleteSkill.mutate(skill.uuid);
  };
  const handleClose = () => { setOpen(false); setSelectedSkill(undefined); };

  return (
    <AppLayout>
      <Card>
        <MasterPageHeader
          title="Skill Management"
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearch={handleSearch}
          searchPlaceHolder="Search skill"
          action={can("create-skill") && <Button onClick={handleCreate}>Add Skill</Button>}
        />
        <CardContent>
          <SkillTable
            skills={data?.data ?? []}
            links={data?.meta?.links ?? []}
            currentPage={data?.meta?.current_page ?? page}
            onPageChange={handlePageChange}
            loading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            canUpdate={can("update-skill")}
            canDelete={can("delete-skill")}
          />
        </CardContent>
      </Card>
      <SkillForm open={open} onClose={handleClose} skill={selectedSkill} />
    </AppLayout>
  );
}