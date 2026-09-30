import MasterPageHeader from "@/components/common/MasterPageHeader";
import CareerForm from "@/components/career/CareerForm";
import CareerTable from "@/components/career/CareerTable";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCan } from "@/hooks/useAuthorization";
import { useDeleteCareer, useCareers } from "@/hooks/useCareer";
import { useMasterTable } from "@/hooks/useMasterTable";
import type { Career } from "@/types/career.type";
import { useState } from "react";

export default function CareerPage() {
  const { page, search, searchInput, setSearchInput, handleSearch, handlePageChange } = useMasterTable();
  const { data, isLoading } = useCareers(page, search);
  const deleteCareer = useDeleteCareer();
  const can = useCan();
  const [open, setOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | undefined>();

  const handleCreate = () => { setSelectedCareer(undefined); setOpen(true); };
  const handleEdit = (career: Career) => { setSelectedCareer(career); setOpen(true); };
  const handleDelete = (career: Career) => {
    if (confirm(`Delete "${career.name}"?`)) deleteCareer.mutate(career.uuid);
  };
  const handleClose = () => { setOpen(false); setSelectedCareer(undefined); };

  return (
    <AppLayout>
      <Card>
        <MasterPageHeader
          title="Career Management"
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearch={handleSearch}
          searchPlaceHolder="Search career"
          action={can("create-career") && <Button onClick={handleCreate}>Add Career</Button>}
        />
        <CardContent>
          <CareerTable
            careers={data?.data ?? []}
            links={data?.meta?.links ?? []}
            currentPage={data?.meta?.current_page ?? page}
            onPageChange={handlePageChange}
            loading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            canUpdate={can("update-career")}
            canDelete={can("delete-career")}
          />
        </CardContent>
      </Card>
      <CareerForm open={open} onClose={handleClose} career={selectedCareer} />
    </AppLayout>
  );
}