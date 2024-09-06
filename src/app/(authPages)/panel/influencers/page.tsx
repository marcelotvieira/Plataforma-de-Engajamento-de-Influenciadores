import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicDrawer } from "@/components/ui/DynamicDrawer";
import { InfluencerForm } from "@/components/ui/InfluencerForm/InfluencerForm";

import { SearchInput } from "@/components/ui/SearchInput";
import InfluencerList from "@/components/ui/InfluencerList";
import { Filters } from "@/components/ui/Filters";
import { getCategories } from "@/components/ui/InfluencerForm/actions";
import { InfluencerCategory } from "@prisma/client";

export default async function Influencers({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const search = searchParams.search
  const minAlcance = searchParams.minAlcance
  const maxAlcance = searchParams.maxAlcance
  const nicho = searchParams.nicho

  const categorias = await getCategories() as InfluencerCategory[]

  return (
    <Card className="border-none !shadow-custom">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between w-full gap-2">
          <CardTitle className="font-normal text-foreground text-base sm:text-xl">Listagem de <span className="text-terciary-foreground">Influenciadores</span>
          </CardTitle>
          <DynamicDrawer title="Cadastrar Influenciador" className="h-[660px] max-h-[80vh] px-4" buttonLabel="Nova" >
            <InfluencerForm />
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
        <InfluencerList
          search={search || ""}
          minAlcance={minAlcance || ""}
          maxAlcance={maxAlcance || ""}
          nicho={nicho || ""}
        />
      </CardContent>
    </Card>
  )
}