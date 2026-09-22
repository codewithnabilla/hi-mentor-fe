import type { ReactNode } from "react"
import { CardHeader, CardTitle } from "../ui/card"
import SearchBar from "./SearchBar"

interface MasterPageHeaderProps {
  title: string
  searchValue: string
  onSearchChange: (value: string) => void
  onSearch: (value: string) => void
  searchPlaceHolder?: string
  action?: ReactNode
}

export default function MasterPageHeader({
  title,
  searchValue,
  onSearchChange,
  onSearch,
  searchPlaceHolder = "Search...",
  action
}: MasterPageHeaderProps) {
  return (
    <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <CardTitle>{title}</CardTitle>

      <div className="flex w-full max-w-md items-center gap-3 md:ml-auto">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onSearch={onSearch}
          placeholder={searchPlaceHolder}
        />

        {action}
      </div>
    </CardHeader>
  )
}