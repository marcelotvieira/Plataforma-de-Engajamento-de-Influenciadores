import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicDrawer } from "@/components/ui/DynamicDrawer";
import { SearchInput } from "@/components/ui/SearchInput";
import { Filters } from "@/components/ui/Filters";
import { getCategories } from "@/components/ui/InfluencerForm/actions";
import { InfluencerCategory } from "@prisma/client";
import BrandList from "@/components/ui/BrandsList";
import { BrandForm } from "@/components/ui/BrandForm/BrandForm";

export default async function Brads({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const search = searchParams.search
  const nicho = searchParams.nicho

  const categorias = await getCategories() as InfluencerCategory[]

  return (
    <Card className="border-none !shadow-custom">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between w-full gap-2">
          <CardTitle className="font-normal text-foreground text-base sm:text-xl">Listagem de <span className="text-terciary-foreground">Marcas</span>
          </CardTitle>
          <DynamicDrawer title="Cadastrar Marca" boxClassName="sm:max-w-sm" className="p-4" buttonLabel="Nova" >
            <BrandForm categorias={categorias} action="create" />
          </DynamicDrawer>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
          <SearchInput searchStr={search} />
          <Filters options={categorias.map((c) => ({
            label: c.nome,
            value: c.id
          }))} />
        </div>
        <BrandList
          search={search || ""}
          nicho={nicho || ""}
        />
      </CardContent>
    </Card>
  )
}