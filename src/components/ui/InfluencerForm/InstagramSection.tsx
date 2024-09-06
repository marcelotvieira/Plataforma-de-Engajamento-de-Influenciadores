import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../input";
import { InfluencerFormValues } from "./InfluencerForm";
import { IInfluencerWithAddressAndCategory } from "@/app/(authPages)/panel/influencers/[id]/page";

interface IInstagramDataSectionProps {
  register: UseFormRegister<InfluencerFormValues>;
  errors: FieldErrors<InfluencerFormValues>;
  influencer: IInfluencerWithAddressAndCategory | undefined;

}

export function InstagramDataSection({ register, errors, influencer }: IInstagramDataSectionProps) {
  return (
    <>
      <p className="border-b border-terciary-foreground pb-2 mt-4">Dados do <span className="text-terciary-foreground">Instagram</span></p>
      <Input
        defaultValue={influencer?.usernameInstagram}
        className="bg-transparent"
        {...register("usernameInstagram", { required: "Nome de usuário é obrigatório" })}
        placeholder="Digite o nome de usuário"
      />
      {errors.usernameInstagram && <p className="text-red-500 text-xs">{errors.usernameInstagram.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2">
        <Input
          defaultValue={influencer?.alcance}
          type="number"
          className="bg-transparent"
          {...register("alcance", { required: "Número de seguidores é obrigatório", valueAsNumber: true })}
          placeholder="Digite o número de seguidores"
        />
        <Input
          defaultValue={influencer?.following}
          type="number"
          className="bg-transparent"
          {...register("following", { required: "Número de pessoas que segue é obrigatório", valueAsNumber: true })}
          placeholder="Digite o número de pessoas que segue"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {errors.alcance && <p className="text-red-500 text-xs ">{errors.alcance.message}</p>}
        {errors.following && <p className="text-red-500 text-xs">{errors.following.message}</p>}
      </div>
    </>
  );
}
