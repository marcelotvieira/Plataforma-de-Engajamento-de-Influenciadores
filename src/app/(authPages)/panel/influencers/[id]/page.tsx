import { Address, Influencer, InfluencerCategory } from "@prisma/client"
import { getInfluencer } from "../actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicDrawer } from "@/components/ui/DynamicDrawer"
import { InfluencerForm } from "@/components/ui/InfluencerForm/InfluencerForm"
import { BiLogoInstagram, BiLogoInstagramAlt } from "react-icons/bi"
import { CatchedImage } from "@/components/catchedImage"

export interface IInfluencerWithAddressAndCategory extends Influencer {
  endereco: Address
  nicho: InfluencerCategory
}

export default async function InfluencerDetails({ params }: { params: { id: string } }) {

  const influencer = await getInfluencer(params.id) as IInfluencerWithAddressAndCategory
  return (
    <Card className="border-none !shadow-custom">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between w-full gap-2">
          <CardTitle className="font-normal text-foreground text-base sm:text-xl">
            Detalhes do <span className="text-terciary-foreground">Influenciador</span>
          </CardTitle>
          <DynamicDrawer title="Cadastrar Influenciador" buttonLabel="Editar" >
            <InfluencerForm influencer={influencer} action="update" />
          </DynamicDrawer>
        </div>
      </CardHeader>
      <CardContent className="p-4 p-12 text-foreground h-full flex justify-center items-center ">

        <div className="flex flex-wrap justify-center gap-6 items-center">
          <CatchedImage
            src={influencer.foto || "/assets/images/avatar-placeholder.png"}
            alt="Influencer Profile"
            className="w-72 rounded-full aspect-square border-4 shadow-custom"
            scapeSrc='/assets/images/avatar-placeholder.png'
          />

          <div className="flex flex-col gap-2 items-center">

            <h2 className="font-semibold">{influencer.nome}</h2>
            <div className="flex gap-1 items-center">
              <BiLogoInstagramAlt className="text-xl text-terciary-foreground" />
              <span className="font-semibold text-sm text-muted-foreground">
                {influencer.usernameInstagram}
              </span>
            </div>
            <p className="text-center text-xs">{influencer.nicho.nome}</p>
            <div className="flex gap-4 items-center py-1 px-6 rounded-lg border">
              <div className="flex flex-col items-center gap-1">
                <span className="text-terciary-foreground font-semibold">
                  {influencer.alcance}
                </span>
                <p className="font-semibold text-sm">Followers</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-terciary-foreground font-semibold">
                  {influencer.following}
                </span>
                <p className="font-semibold text-sm">Following</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-sm">Endereço</h3>
              <p className="text-xs text-muted-foreground">
                {influencer.endereco.logradouro}, {influencer.endereco.unidade} {influencer.endereco.bairro}
                , {influencer.endereco.localidade} - {influencer.endereco.uf}
              </p>
              <p className="text-xs text-muted-foreground">CEP: {influencer.endereco.cep}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}