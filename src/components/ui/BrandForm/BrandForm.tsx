'use client';

import { Input } from "../input";
import { Label } from "../label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../select";
import { Textarea } from "../textarea";
import { Button } from "../button";
import { DrawerClose } from "../drawer";
import { registerBrand, updateBrand } from "./actions";
import { useState } from "react";
import { IBrandWithNichoAndInfluencers } from "@/app/(authPages)/panel/brands/[id]/page";
import { InfluencerCategory } from "@prisma/client";
import { useToast } from "@/components/hooks/use-toast";
import { VscLoading } from "react-icons/vsc";

export interface IBrandFormValues {
  nome: string;
  nicho: string;
  descricao: string;
}

interface IBrandFormProps {
  brand?: IBrandWithNichoAndInfluencers;
  action: string;
  categorias: InfluencerCategory[];
}

export function BrandForm({ brand, categorias, action }: IBrandFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const updateActionBinded = brand ? updateBrand.bind(null, brand?.id) : undefined;
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      if (action === "update" && updateActionBinded) {
        await updateActionBinded(formData);
        return toast({ title: "Sucesso", description: "Marca salva com sucesso!" });
      }
      await registerBrand(formData);
      toast({ title: "Sucesso", description: "Marca salva com sucesso!" });
    } catch (e) {
      console.log("Error", process.env.NODE_ENV === "development" && e)
      toast({ title: "Falha", description: "Falha ao salvar marca." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 items-center gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome">Nome</Label>
            <Input required defaultValue={brand?.nome} id="nome" name="nome" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="nicho">Categoria</Label>
            <Select required name="nicho" defaultValue={brand?.nicho.id}>
              <SelectTrigger type="button">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="p-4 font-semibold">Categorias</SelectLabel>
                  {categorias.map((o, index) => (
                    <SelectItem key={index} value={o.id}>
                      {o.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="my-4 flex flex-col gap-2">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea defaultValue={brand?.descricao || ""} name="descricao" id="descricao" className="resize-none" />
        </div>

        <div className="flex items-center justify-end mt-8 gap-2">
          <DrawerClose>
            <Button type="button" variant="destructive">
              Cancelar
            </Button>
          </DrawerClose>

          <Button type="submit" className="flex items-center gap-2" disabled={isLoading}>
            {isLoading && <VscLoading className="animate-spin" />}
            {action === "update" ? "Atualizar" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
