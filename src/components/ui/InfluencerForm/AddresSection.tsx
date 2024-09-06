import { Input } from "../input";
import { Label } from "../label";
import { InfluencerFormValues } from "./InfluencerForm";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IInfluencerWithAddressAndCategory } from "@/app/(authPages)/panel/influencers/[id]/page";

interface IAddressSectionProps {
  register: UseFormRegister<InfluencerFormValues>;
  setValue: UseFormSetValue<InfluencerFormValues>;
  errors: FieldErrors<InfluencerFormValues>;
  influencer: IInfluencerWithAddressAndCategory | undefined;
}

interface IDisabledInputProps {
  register: UseFormRegister<InfluencerFormValues>
  name: "logradouro" | "localidade" | "uf" | "bairro"
  value: string
  placeholder: string
}

function DisabledInput({ register, name, value, placeholder, ...props }: IDisabledInputProps) {
  return (
    <Input
      className="bg-transparent"
      disabled
      value={value}
      placeholder={placeholder}
      {...register(name)} // Use register here for consistency
      {...props}
    />
  );
}

export function AddressSection({ register, setValue, errors, influencer }: IAddressSectionProps) {
  const handleCepBlur = async (data: string) => {
    if (data.length === 8) { // Validates CEP length before fetching
      try {
        const res = await fetch(`https://viacep.com.br/ws/${data}/json/`);
        const address = await res.json();
        if (address.erro) {
          // Handle invalid CEP
          console.error('CEP inválido');
          return;
        }
        setValue("logradouro", address.logradouro);
        setValue("bairro", address.bairro);
        setValue("localidade", address.localidade);
        setValue("uf", address.uf);
        setValue("cep", data); // Also update the value of CEP input
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <Label>Endereço</Label>
      <div className="grid grid-cols-2 gap-2">
        <Input
          className="bg-transparent"
          {...register("cep", { required: "CEP é obrigatório", minLength: 8, maxLength: 8 })}
          placeholder="Digite o Cep"
          onBlur={(e) => handleCepBlur(e.target.value)}
          defaultValue={influencer?.endereco.cep}
        />
        <Input
          type="number"
          className="bg-transparent"
          {...register("unidade", { required: "Número é obrigatório" })}
          placeholder="Digite o número"
          defaultValue={influencer?.endereco.unidade}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {errors.cep && <p className="text-red-500 text-xs">{errors.cep.message}</p>}
        {errors.unidade && <p className="text-red-500 text-xs">{errors.unidade.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <DisabledInput
          register={register}
          name="logradouro"
          value={influencer?.endereco.logradouro || ''}
          placeholder="Rua"
        />
        <DisabledInput
          register={register}
          name="bairro"
          value={influencer?.endereco.bairro || ''}
          placeholder="Bairro"
        />
        <DisabledInput
          register={register}
          name="localidade"
          value={influencer?.endereco.localidade || ''}
          placeholder="Cidade"
        />
        <DisabledInput
          register={register}
          name="uf"
          value={influencer?.endereco.uf || ''}
          placeholder="Estado"
        />
      </div>
    </>
  );
}
