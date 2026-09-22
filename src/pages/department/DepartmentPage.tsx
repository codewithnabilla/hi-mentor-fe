import SearchBar from "@/components/common/SearchBar";
import DepartmentForm from "@/components/department/DepartmentForm";
import DepartmentTable from "@/components/department/DepartmentTable";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCan } from "@/hooks/useAuthorization";
import { useDeleteDepartment, useDepartments } from "@/hooks/useDepartment";
import type { Department } from "@/types/department.type";
import { useCallback, useState } from "react";

export default function DepartmentPage() {
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
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

  const handlePageChange = (nextPage: number) => {
    if (!nextPage || nextPage < 1) return
    setPage(nextPage)
  }

  const handleSearch = useCallback((nextSearch: string) => {
    setSearch(nextSearch)
    setPage(1)
  }, [])

  return (
    <AppLayout>
      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle>Department Management</CardTitle>
          <div className="flex w-full max-w-md items-center gap-3 md:ml-auto">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              placeholder="Search department..."
            />
            {can("create-permission") && <Button onClick={handleCreate}>Add Permission</Button>}
          </div>
        </CardHeader>

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