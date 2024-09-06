"use client"
import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { SelectLabel } from "@radix-ui/react-select"
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime"

interface IFilterSelectProps {
  options: {
    value: string
    label: string
  }[]
}

export function Filters({ options }: IFilterSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSelectChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('nicho', value !== "all" ? value : "")
    router.push(`?${params.toString()}`)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("rodando")
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const minAlcance = (form.elements.namedItem('minAlcance') as HTMLInputElement).value
    const maxAlcance = (form.elements.namedItem('maxAlcance') as HTMLInputElement).value

    const params = new URLSearchParams(searchParams.toString())
    minAlcance ? params.set('minAlcance', minAlcance) : params.delete('minAlcance')
    maxAlcance ? params.set('maxAlcance', maxAlcance) : params.delete('maxAlcance')

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 max-w-2xl">
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="p-4 font-semibold">Categorias</SelectLabel>
            <SelectItem value={"all"}>Todos</SelectItem>
            {options.map((o, index) => (
              <SelectItem key={index} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <form className="grid grid-cols-2 gap-2 items-center" onSubmit={handleFormSubmit}>
        <Input name="minAlcance" placeholder="Min seguidores" />
        <Input name="maxAlcance" placeholder="Max seguidores" />
        <button className="hidden" />
      </form>
    </div>
  )
}
