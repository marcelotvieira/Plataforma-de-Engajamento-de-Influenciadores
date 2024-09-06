import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "next/navigation"

interface IFilterSelectProps {
  paramName: string
  placeholder?: string
  options: {
    value: string
    label: string
  }[]
}

export function FilterSelect({ paramName, options, placeholder }: IFilterSelectProps) {

  const router = useRouter()
  const handleSubmit = (value: string) => {
    const pathName = usePathname()
    const currentRoute = pathName;
    router.push(`?${paramName}=${value}`);
  }
  return (
    <Select onValueChange={handleSubmit}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((o, index) => (
            <SelectItem key={index} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
