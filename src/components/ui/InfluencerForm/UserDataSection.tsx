import { InfluencerCategory } from "@prisma/client";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { ScrollArea } from "../scroll-area";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { InfluencerFormValues } from "./InfluencerForm";
import { IInfluencerWithAddressAndCategory } from "@/app/(authPages)/panel/influencers/[id]/page";
import { CatchedImage } from "@/components/catchedImage";

interface IUserDataSectionProps {
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: InfluencerCategory[];
  influencer?: IInfluencerWithAddressAndCategory;
  register: UseFormRegister<InfluencerFormValues>;
  errors: FieldErrors<InfluencerFormValues>;
}

export function UserDataSection({ register, imagePreview, handleImageChange, categories, influencer, errors }: IUserDataSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <p className="border-b border-terciary-foreground pb-2">Dados do <span className="text-terciary-foreground">Usuário</span></p>

      <Label htmlFor="nome" className="text-xs sm:text-sm">Nome:</Label>
      <Input
        defaultValue={influencer?.nome}
        className="bg-transparent"
        {...register("nome", { required: "Nome é obrigatório" })}
        placeholder="Digite o nome"
      />
      {errors.nome && <p className="text-red-500 text-xs ">{errors.nome.message}</p>}

      <Label htmlFor="email" className="text-xs sm:text-sm">Email:</Label>
      <Input
        defaultValue={influencer?.email}
        className="bg-transparent"
        placeholder="Digite o email"
        {...register(
          "email",
          {
            required: "Email é obrigatório",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" },
          })}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="grid grid-cols-1 gap-4">
          <Label htmlFor="foto" className="text-xs sm:text-sm">
            Foto:
          </Label>
          <div className="flex flex-col items-center gap-4">
            <div className="border w-52 aspect-square flex items-center justify-center rounded overflow-hidden">
              <CatchedImage
                scapeSrc="/assets/images/avatar-placeholder.png"
                src={imagePreview || influencer?.foto || '/assets/images/avatar-placeholder.png'}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              {...register("foto")}
              name="foto"
              type="file"
              id="foto"
              accept=".jpg, .jpeg, .png, .gif, .bmp"
              className="hidden"
              onChange={handleImageChange}
            />
            <Button
              type="button"
              size="sm"
              className="bg-primary text-primary-foreground rounded-full px-8"
              onClick={() => document.getElementById('foto')?.click()}>
              Selecionar
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="nicho" className="text-xs sm:text-sm">Categoria:</Label>
          {categories.length > 0 ? (
            <ScrollArea className="h-72 mt-4 border-b p-2">
              {categories.map((c) => (
                <div key={c.id} className="flex items-center gap-1 my-2 group">
                  <Input
                    defaultChecked={influencer?.nicho.id === c.id}
                    type="radio"
                    id={c.id}
                    value={c.id}
                    className="w-4 h-4"
                    {...register("nicho", { required: "Categoria é obrigatória" })}
                  />
                  <Label
                    htmlFor={c.id}
                    className="inline-flex items-center group-hover:text-accent"
                  >
                    <span className="ml-2 block text-xs font-medium">{c.nome}</span>
                  </Label>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <div className="h-72 mt-4 p-2 border-b flex flex-col gap-2 justify-center ">
              {new Array(12).fill(0).map((i, index) => (
                <div key={index} className="w-full h-4  bg-secondary rounded animate-fast-pulse"></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
