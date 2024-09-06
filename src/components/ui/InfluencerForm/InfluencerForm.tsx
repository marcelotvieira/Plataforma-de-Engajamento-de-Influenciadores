"use client"

import { useForm } from "react-hook-form";
import { Button } from "../button";
import { DrawerClose } from "../drawer";
import { useEffect, useState } from "react";
import { InfluencerCategory } from "@prisma/client";
import { UserDataSection } from "./UserDataSection";
import { AddressSection } from "./AddresSection";
import { InstagramDataSection } from "./InstagramSection";
import { getCategories, registerInfluencer, updateInfluencer } from "./actions";
import { useRouter } from "next/navigation";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { VscLoading } from "react-icons/vsc";
import { useToast } from "@/components/hooks/use-toast";
import { IInfluencerWithAddressAndCategory } from "@/app/(authPages)/panel/influencers/[id]/page";
import { uploadImageToCloudinary } from "@/lib/upload-cloudinary";

interface IInfluencerFormProps {
  influencer?: IInfluencerWithAddressAndCategory;
  action?: string;
}

export type InfluencerFormValues = {
  nome: string;
  email: string;
  nicho: string;
  alcance: number;
  following: number;
  usernameInstagram: string;
  logradouro: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
  foto: File | string | null;
};

export function InfluencerForm({ influencer, action }: IInfluencerFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InfluencerFormValues>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<InfluencerCategory[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const processFormData = async (data: InfluencerFormValues) => {
    let foto = data.foto;
    if (foto instanceof File) {
      foto = await uploadImageToCloudinary(foto);
    }
    if (data.foto instanceof FileList && data.foto.length < 1) {
      foto = influencer?.foto || "";
    }
    return { ...data, foto: foto as string };
  };

  const handleSubmitForm = async (data: InfluencerFormValues) => {
    setIsLoading(true);
    const isDevelopment = process.env.NODE_ENV === "development"
    try {
      const processedData = await processFormData(data);
      const newRegister = action === "update"
        ? await updateInfluencer(influencer?.id as string, processedData)
        : await registerInfluencer(processedData);
      console.log(newRegister)
      toast({
        title: "Sucesso",
        description: `Influenciador salvo com sucesso`
      });
    } catch (error) {
      console.error('Erro ao ao salvar influenciador:', isDevelopment && error);
      toast({
        title: "Falha",
        description: isDevelopment ?
          (error as PrismaClientValidationError).message :
          `Erro ao salvar Influenciador`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("foto", file);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 items-center sm:grid-cols-2 gap-2">
        <Button size="lg" className="w-full bg-red rounded-full font-normal text-xs !shadow-lg">
          Dados do usuário
        </Button>
        <Button size="lg" className="w-full bg-secondary rounded-full font-normal text-xs !shadow-lg ">
          Métricas de Audiência
        </Button>
      </div>

      <form onSubmit={handleSubmit(handleSubmitForm)} className="grid grid-cols-1 gap-4 mt-8">
        <UserDataSection
          influencer={influencer}
          errors={errors}
          categories={categories}
          register={register}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
        />
        <AddressSection
          influencer={influencer}
          errors={errors}
          register={register}
          setValue={setValue} />
        <InstagramDataSection
          influencer={influencer}
          errors={errors}
          register={register}
        />
        <div className="flex items-center justify-end mt-8 gap-2">
          <DrawerClose>
            <Button
              type="button"
              variant="destructive"
            >
              Cancelar
            </Button>
          </DrawerClose>

          <Button
            disabled={isLoading}
            type="submit"
            className="flex items-center gap-2"
          >
            {isLoading && <VscLoading className="animate-spin" />}
            {action === "update" ? "Atualizar" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
