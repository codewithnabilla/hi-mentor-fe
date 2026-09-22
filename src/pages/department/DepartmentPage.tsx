import MasterPageHeader from "@/components/common/MasterPageHeader";
import DepartmentForm from "@/components/department/DepartmentForm";
import DepartmentTable from "@/components/department/DepartmentTable";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCan } from "@/hooks/useAuthorization";
import { useDeleteDepartment, useDepartments } from "@/hooks/useDepartment";
import { useMasterTable } from "@/hooks/useMasterTable";
import type { Department } from "@/types/department.type";
import { useState } from "react";

export default function DepartmentPage() {
  const {
    page,
    search,
    searchInput,
    setSearchInput,
    handleSearch,
    handlePageChange,
  } = useMasterTable()

  const { data, isLoading } = useDepartments(page, search)
  const deleteDepartment = useDeleteDepartment()
  const can = useCan()

  const [open, setOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>()

  const handleCreate = () => {
    setSelectedDepartment(undefined)
    setOpen(true)
  }

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department)
    setOpen(true)
  }

  const handleDelete = (department: Department) => {
    if (confirm(`Delete "${department.name}"?`)) {
      deleteDepartment.mutate(department.uuid);
    }
  };

  const handleClose = () => {
    setOpen(false)
    setSelectedDepartment(undefined)
  }

  return (
    <AppLayout>
      <Card>
        <MasterPageHeader
          title="Department Management"
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearch={handleSearch}
          searchPlaceHolder="Search department"
          action={
            can("create-department") && (
              <Button onClick={handleCreate}>
                Add Department
              </Button>
            )
          }
        />

        <CardContent>
          <DepartmentTable
            departments={data?.data ?? []}
            links={data?.meta?.links ?? []}
            currentPage={data?.meta?.current_page ?? page}
            onPageChange={handlePageChange}
            loading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            canUpdate={can("update-department")}
            canDelete={can("delete-department")}
          />
        </CardContent>
      </Card>

      <DepartmentForm
        open={open}
        onClose={handleClose}
        department={selectedDepartment}
      />
    </AppLayout>
  )
}