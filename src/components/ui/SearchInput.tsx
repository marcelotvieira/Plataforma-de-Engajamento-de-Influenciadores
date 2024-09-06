"use client"
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';

export interface ISearchInputProps {
  searchStr?: string
  placeholder?: string
}

export function SearchInput({ searchStr, placeholder }: ISearchInputProps) {
  const form = useForm()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearch = form.handleSubmit(async ({ search }) => {
    const params = new URLSearchParams(searchParams.toString())
    search ? params.set('search', search) : params.delete('search')
    router.push(`?${params.toString()}`)
  })

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex-1">
        <Input
          defaultValue={searchStr}
          {...form.register("search")}
          placeholder={placeholder || "Buscar..."}
          className="w-full pr-12 rounded-md border border-input bg-background text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FaSearch />
        </div>
      </div>
    </form>
  );
}
