import { useCallback, useState } from "react"

interface useMasterTableOptions {
  initialPage?: number
  initialSearch?: string
}

export function useMasterTable({
  initialPage = 1,
  initialSearch = ""
}: useMasterTableOptions = {}) {
  const [page, setPage] = useState(initialPage)
  const [searchInput, setSearchInput] = useState(initialSearch)
  const [search, setSearch] = useState(initialSearch)

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handlePageChange = useCallback((nextPage: number) => {
    if (!nextPage || nextPage < 1) return

    setPage(nextPage)
  }, [])

  return {
    page,
    search,
    searchInput,
    setSearchInput,
    handleSearch,
    handlePageChange
  }
}