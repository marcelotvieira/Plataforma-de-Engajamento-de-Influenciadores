import { Brand, Influencer, InfluencerCategory } from "@prisma/client"
import { getBrand } from "../actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicDrawer } from "@/components/ui/DynamicDrawer"
import { HiUserGroup } from "react-icons/hi2";
import { ScapeLink } from "@/components/scapeLink"
import { BrandForm } from "@/components/ui/BrandForm/BrandForm"
import { getCategories } from "@/components/ui/InfluencerForm/actions"
import { BsGearFill } from "react-icons/bs"
import { BondSelector } from "@/components/ui/BondSelector";

interface IBrandDetailsProps {
  params: { id: string }
  searchParams: { [key: string]: string | undefined }
}

export interface IBrandWithNichoAndInfluencers extends Brand {
  nicho: InfluencerCategory
  influencers: Influencer[]
}

export default async function BrandDetails({ params, searchParams }: IBrandDetailsProps) {
  const search = searchParams.search
  const nicho = searchParams.nicho

  const brand = await getBrand(params.id) as IBrandWithNichoAndInfluencers
  const categorias = await getCategories()
  return (
    <Card className="border-none !shadow-custom">

      <CardHeader className="p-4">
        <div className="flex items-center justify-between w-full gap-2">
          <CardTitle className="font-normal text-foreground text-base sm:text-xl">Listagem de <span className="text-terciary-foreground">Marcas</span>
          </CardTitle>
          <DynamicDrawer title="Cadastrar Marca" boxClassName="sm:max-w-sm" className="p-4" buttonLabel="Editar" >
            <BrandForm categorias={categorias} brand={brand} action="update" />
          </DynamicDrawer>
        </div>
      </CardHeader>

      <CardContent className="p-4 p-12 text-foreground h-full min-w-full items-center ">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-bold text-xl">{brand.nome.toUpperCase()}</h1>
            <p className="text-muted-foreground max-w-md text-sm text-center">{brand.descricao}</p>
            <div className="bg-red rounded-full text-sm flex items-center text-primary-foreground px-4 py-1 rounded">
              {brand.nicho.nome}
            </div>
          </div>
        </div>


        <div className="w-full mt-8">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-primary">INFLUENCIADORES</h1>
            <DynamicDrawer
              buttonSize="icon"
              title="Gerenciar Vínculos"
              buttonClassName="w-6 h-6 rounded-full"
              boxClassName="sm:max-w-sm"
              className="px-4"
              buttonLabel={<BsGearFill />}
            >
              <BondSelector brand={brand} search={search || ""} nicho={nicho || ""} />
            </DynamicDrawer>
          </div>

          {brand.influencers.length > 0 ? (
            brand.influencers.map((i, index) => (
              <ScapeLink className="w-full my-2 flex items-center justify-between border p-1 px-2 rounded-md !shadow-lg bg-card hover:!shadow-custom transition-all cursor-pointer" href={`/panel/influencers/${i.id}`}>
                <div className="text-left">
                  <h1 className="text-sm">
                    {i.nome}
                  </h1>
                  <p className="text-xs text-primary">@{i.usernameInstagram}</p>
                </div>
                <div className="flex gap-2 items-center ">
                  <HiUserGroup className="text-primary" />
                  <span className="font-semibold text-sm">{i.alcance}</span>
                </div>
              </ScapeLink>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">Nenhum influenciador vinculado</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}