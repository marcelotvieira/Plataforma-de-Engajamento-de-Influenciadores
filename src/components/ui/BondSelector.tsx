"use client"
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./SearchInput";
import { getInfluencersAsOptions } from "@/app/(authPages)/panel/influencers/actions";
import { IBrandWithNichoAndInfluencers } from '@/app/(authPages)/panel/brands/[id]/page';
import { updateBrandInfluencers } from '@/app/(authPages)/panel/brands/actions';
import { useToast } from '../hooks/use-toast';

type FormValues = {
  influencers: string[];
};

export function BondSelector({ search, nicho, brand }: { brand: IBrandWithNichoAndInfluencers, search: string, nicho: string }) {
  const [influencers, setInfluencers] = useState<{ id: string, nome: string }[]>([]);
  const { toast } = useToast()
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      influencers: brand.influencers.map((i) => i.id) || [],
    },
  });

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        const data = await getInfluencersAsOptions(undefined, 32, search, nicho);
        setInfluencers(data);
      } catch (error) {
        console.error('Erro ao buscar influenciadores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, [search, nicho]);

  const onSubmit = async (data: FormValues) => {
    try {
      await updateBrandInfluencers(brand.id, data.influencers);
      toast({ title: "Sucesso", description: "Vínculos atualizdos" })
    } catch (error) {
      console.error('Erro ao atualizar influenciadores:', error);
      toast({ title: "Erro", description: "Erro ao atualizar influenciadores. Tente novamente mais tarde." });
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <SearchInput searchStr={search} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full flex-col items-center gap-2 border rounded-lg p-2 overflow-y-auto mb-4 max-h-[360px] scrollbar scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
          {loading ? (
            <div className="flex w-full flex-col gap-2 bg-secondary rounded-lg p-2 animate-pulse">
              <div className="h-6 rounded bg-secondary w-full animate-pulse flex gap-2 justify-between">
              </div>
            </div>
          ) : (
            influencers.length > 0 ? (
              influencers.map((i) => (
                <Controller
                  key={i.id}
                  name="influencers"
                  control={control}
                  render={({ field }) => (
                    <div
                      onClick={() => {
                        const newSelected = field.value.includes(i.id)
                          ? field.value.filter(id => id !== i.id)
                          : [...field.value, i.id];
                        setValue("influencers", newSelected);
                      }}
                      className="flex w-full hover:bg-accent flex-col gap-2 bg-secondary rounded-lg p-2">
                      <div className="flex gap-2 justify-between">
                        <div className="flex flex-col justify-center gap-0">
                          <div className="font-semibold text-sm">
                            {i.nome}
                          </div>
                        </div>
                        <input
                          disabled={loading}
                          type="checkbox"
                          checked={field.value.includes(i.id)}
                          className="form-checkbox"
                        />
                      </div>
                    </div>
                  )}
                />
              ))
            ) : (
              <div className="flex w-full flex-col gap-2 bg-secondary rounded-lg p-2">
                <div className="text-center text-sm text-gray-500">
                  Nenhum influenciador encontrado.
                </div>
              </div>
            )
          )}
        </div>
        <Button type="submit" className="flex items-center gap-2 float-right py-2 px-4">
          Salvar
        </Button>
      </form>
    </div>
  );
}
